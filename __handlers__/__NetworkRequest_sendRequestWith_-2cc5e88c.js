/*
 * Auto-generated by Frida. Please modify to match the signature of -[ZHRequestHandle sendRequestWithURL:parameter:security:weakself:showHUDView:showHUDText:completionBlock:errorBlock:].
 * This stub is currently auto-generated from manpages when available.
 *
 * For full API reference, see: http://www.frida.re/docs/javascript-api/
 */

{
  /**
   * Called synchronously when about to call -[ZHRequestHandle sendRequestWithURL:parameter:security:weakself:showHUDView:showHUDText:completionBlock:errorBlock:].
   *
   * @this {object} - Object allowing you to store state for use in onLeave.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {array} args - Function arguments represented as an array of NativePointer objects.
   * For example use Memory.readUtf8String(args[0]) if the first argument is a pointer to a C string encoded as UTF-8.
   * It is also possible to modify arguments by assigning a NativePointer object to an element of this array.
   * @param {object} state - Object allowing you to keep state across function calls.
   * Only one JavaScript function will execute at a time, so do not worry about race-conditions.
   * However, do not use this to store function arguments across onEnter/onLeave, but instead
   * use "this" which is an object for keeping state local to an invocation.
   */
  onEnter: function (log, args, state) {

    log("[+] INTO HOOK METHOD");
    log(new ObjC.Object(args[4]).$className);

    console.log("Before change" + new ObjC.Object(args[4]).toString());

    var url = new ObjC.Object(args[2]);

    var orig_str = new ObjC.Object(args[4]).toString();

    var orig_object = JSON.parse(orig_str);

    var result = {};

    for(key in orig_object) {
      //console.log(key + ":" + orig_object[key]);
      if(orig_object[key]) {
        result[key] = orig_object[key].toString();
      } else {
        result[key] = null;
      }

    }


    result['orig_request_url'] = url.toString();

    //console.log(JSON.stringify(result));

    send({from:'/http', payload:JSON.stringify(result)});

    var op = recv('input', function onMessage(value){

      log("[-] Forwarding from input: " + value.payload);
      var NSString = ObjC.classes.NSString;

      args[4] = NSString.stringWithString_(value.payload);

    });
    op.wait();

  },

  /**
   * Called synchronously when about to return from -[ZHRequestHandle sendRequestWithURL:parameter:security:weakself:showHUDView:showHUDText:completionBlock:errorBlock:].
   *
   * See onEnter for details.
   *
   * @this {object} - Object allowing you to access state stored in onEnter.
   * @param {function} log - Call this function with a string to be presented to the user.
   * @param {NativePointer} retval - Return value represented as a NativePointer object.
   * @param {object} state - Object allowing you to keep state across function calls.
   */
  onLeave: function (log, retval, state) {
  }
}

