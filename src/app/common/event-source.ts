export interface UnsubscribeFn {
  (): void
}

export type ResponseException = {
  message: string | undefined,
  code: any
}

export interface ReadonlyDataStream {
  subscribe<T = unknown>(eventName: string, callbacks: {
    onData: (data: T) => void
    onError?: (error: ResponseException) => void
  }): UnsubscribeFn

  destroy(): void
}

export class EventSourceStream implements ReadonlyDataStream {
  protected static useCache(url: string, createStream: (url: string) => EventSource) {
    let stream = EventSourceStream.streams.get(url);
    if (!stream) {
      stream = createStream(url);
      EventSourceStream.streams.set(url, stream)
    }
    return stream
  }

  protected static streams = new Map<string, EventSource>();
  es?: EventSource

  constructor(
    private url: string
  ) {

  }

  subscribe<T = unknown>(eventName: string, callbacks: {
    onData: (data: T, streamId?: string) => void,
    onError?: (error: ResponseException) => void,
  }) {
    this.es = EventSourceStream.useCache(
      this.url,
      (url: string) => new EventSource(url, {})
    )

    const {es} = this;

    const onmessage = (e: MessageEvent) => {
      const data = e.data ? JSON.parse(e.data) : e.data
      const streamId = e.lastEventId;
      callbacks.onData(data, streamId)
    }
    const onerror = (error: Event) => {
      let state = 'ERR_CONNECTION_REFUSED'
      if (es?.CLOSED) {
        state = 'CLOSED'
      }
      if (es?.CONNECTING) {
        state = 'CONNECTING'
      }
      if (es?.OPEN) {
        state = 'OPEN'
      }
      callbacks.onError && callbacks.onError({
        code: state,
        message: `Error: ${state}`
      })
    }
    es?.addEventListener(eventName as 'message', onmessage)
    es?.addEventListener('error', onerror)
    const unsubscribe = () => {
      es?.removeEventListener(eventName as 'message', onmessage)
      es?.removeEventListener('error', onerror)
      this.unsubscribers.splice(this.unsubscribers.indexOf(unsubscribe), 1)
    }
    this.unsubscribers.push(unsubscribe)
    return unsubscribe
  }

  unsubscribers: Function[] = []

  destroy() {
    // закрываем соединение
    if (this.es && !this.es.CLOSED) {
      this.es.close();
    }
    this.unsubscribers.forEach(uns => uns())
  }
}

