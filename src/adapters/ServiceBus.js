/**
 * Event bus
 *
 * @param zeromq
 */
export default (zeromq) => {

  const publish = (event: Event) => {
    zeromq.publish(event);
  };

  const subscribe = (event: Event, callback: Function) => {
    zeromq.subscribe(event.name, callback);
  };

  const subscribeAll = (callback: Function) => {
    zeromq.subscribeAll(callback);
  };

  return {
    publish,
    subscribe,
    subscribeAll
  };
}
