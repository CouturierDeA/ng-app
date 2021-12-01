import {Store} from "./store";

describe('Rx store works correctly', () => {
  type TestItem = {
    id: number,
    title: string
  }
  let entity: TestItem
  let entity2: TestItem
  let entity3: TestItem
  let store: Store<TestItem>
  beforeEach(() => {
    entity = {
      id: 1,
      title: 'Test Item 1'
    }
    entity2 = {
      id: 2,
      title: 'Test Item 2'
    }
    entity3 = {
      id: 3,
      title: 'Test Item 3'
    }
    store = new Store<TestItem>()
  })
  it('Store adds and deletes entities correctly', () => {
    expect(store.getEntities()).toEqual([])
    store.addEntity(entity)
    expect(store.getEntities()).toEqual([entity])
    store.addEntity(entity2)
    expect(store.getEntities()).toEqual([entity, entity2])
    store.deleteEntity(entity.id)
    expect(store.getEntities()).toEqual([entity2])
    store.deleteEntity(entity2.id)
    expect(store.getEntities()).toEqual([])
  });

  it('Store updates entities correctly', () => {
    store.addEntity(entity);
    expect(store.getEntities()).toEqual([entity])
    const updateEntity = {
      id: entity.id,
      title: 'Updated entity title'
    }
    store.updateEntity(updateEntity)
    expect(store.getEntities()).toEqual([updateEntity])
  });

  it('Can subscribe store entity', async () => {
    const testBed = {
      callback: (newEntities: TestItem[]) => {
      },
    }
    spyOn(testBed, 'callback');
    const unsub = store.subscribe(testBed.callback)
    const testBed2 = {
      unsub
    }
    expect(testBed.callback).toHaveBeenCalledTimes(1)
    spyOn(testBed2, 'unsub');
    store.addEntity(entity);
    expect(testBed.callback).toHaveBeenCalledWith([entity])
    store.addEntity(entity2);
    expect(testBed.callback).toHaveBeenCalledWith([entity, entity2])
    expect(testBed.callback).toHaveBeenCalledTimes(3)
    testBed2.unsub()
  });

  it('Can unsubscribe store entity', () => {
    let times = 0
    const testBed = {
      callback: (newEntities: TestItem[]) => {
        times += 1
      },
    }
    spyOn(testBed, 'callback');
    const unsub = store.subscribe(testBed.callback)
    store.addEntity(entity);
    expect(testBed.callback).toHaveBeenCalledWith([entity])
    expect(testBed.callback).toHaveBeenCalledTimes(2)
    unsub()
    store.addEntity(entity3);
    expect(testBed.callback).toHaveBeenCalledTimes(2)
  });
})
