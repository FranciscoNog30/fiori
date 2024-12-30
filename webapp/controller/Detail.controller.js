sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function(Controller, History) {
      "use strict";
  
      return Controller.extend("project2.controller.Detail", {
        onInit: function() {
            let oRouter = this.getOwnerComponent().getRouter(); 
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
			
        },


        _onObjectMatched: function (oEvent) { 
          let iIndex = window.decodeURIComponent(oEvent.getParameter("arguments").index);  
          let oView = this.getView(); 
          let sPath = "/VisitasB/" + iIndex; 
          oView.bindElement({ 
            path: sPath  
           }); 
        }, 
              
  

        onRegresar(){
            const oRouterD = this.getOwnerComponent().getRouter();
			oRouterD.navTo("RoutelistasVisitas");
        }
      });
    }
  );
  