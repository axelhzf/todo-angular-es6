var Directive = require("../lib/Directive");

class FocusDirective extends Directive {

  constructor ($timeout) {
    super();
    debugger;
    this.$timeout = $timeout;
  }

  link (scope, element, attrs) {
    super.link(scope, element, attrs);

    this.$.$watch(attrs.focus, (newVal) => {
      if (newVal) {
        this.$timeout(function () {
          element[0].focus();
        }, 0, false);
      }
    });

  }
}

module.exports = FocusDirective;