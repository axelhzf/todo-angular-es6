var Directive = require("../lib/Directive");

var ESCAPE_KEY = 27;

class EscapeDirective extends Directive {

  link (scope, element, attrs) {
    super.link(scope, element, attrs);

    element.on("keydown", (event) => {
      if (event.keyCode === ESCAPE_KEY) {
        this.$.$apply(this.attrs.escape);
      }
    });
  }

}

module.exports = EscapeDirective;