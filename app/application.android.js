//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIiJdfQ==

const superProto = android.app.Application.prototype;
var com = {
  moventes: {
    moventest: {
      nativescript: {
        Timer: {
          start: 0
        }
      }
    }
  }
};

// the first parameter of the `extend` call defines the package and the name for the native *.JAVA file generated.
android.app.Application.extend("com.moventes.moventest.nativescript.Application", {
  onCreate: function () {
    superProto.onCreate.call(this);

    // At this point modules have already been initialized

    // Enter custom initialization code here
    // console.error('Application started at ' + new Date().getTime());
    com.moventes.moventest.nativescript.Timer.start = new Date().getTime();
  },
  attachBaseContext: function (base) {
    superProto.attachBaseContext.call(this, base);
    // This code enables MultiDex support for the application (if needed)
    // android.support.multidex.MultiDex.install(this);
  }
});
