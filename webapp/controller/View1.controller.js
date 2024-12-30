sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {

        },
        onVisitasPress(){
            const oRouterD = this.getOwnerComponent().getRouter();
			oRouterD.navTo("RoutelistasVisitas");
        },
        onCrearVisitasPress(){
            const oRouterD = this.getOwnerComponent().getRouter();
			oRouterD.navTo("RoutecrearVisitas");
        }
    });
});
