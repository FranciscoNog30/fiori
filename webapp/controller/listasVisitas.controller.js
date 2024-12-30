sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
],
function (Controller, MessageBox, MessageToast, History, Filter, FilterOperator, JSONModel ) {
    "use strict";

    return Controller.extend("project2.controller.listasVisitas", {
        onInit: function () {

        },
        onRegresar(){
            const oRouterD = this.getOwnerComponent().getRouter();
			oRouterD.navTo("RouteView1");
        },
        obtenerValores(){
            let codigo           = this.getView().byId("codigo").getValue();
            let descripcion      = this.getView().byId("descripcion").getValue();
            let estatus          = this.getView().byId("estatus").getValue();
            let componente       = this.getView().byId("componente").getValue();
            let grupos           = this.getView().byId("grupos").getValue();
            let colegio          = this.getView().byId("colegio").getValue();
            let fechaPlan        = this.getView().byId("fechaPlan").getValue();
            let fecha            = this.getView().byId("fecha").getValue();
            let fechaCierre      = this.getView().byId("fechaCierre").getValue();
            

            let newProduct = {
                "Codigo": codigo,
                "Descripcion": descripcion,
                "Estatus": estatus,
                "Componente": componente,
                "Grupos": grupos,
                "Colegio": colegio,
                "Fecha Plan": fechaPlan,
                "Fecha": fecha,
                "Fecha Cierre": fechaCierre
                
            };

            return newProduct;
        },
        onclearInput(){
            this.getView().byId("codigo").setValue("");
            this.getView().byId("descripcion").setValue("");
            this.getView().byId("estatus").setValue("");
            this.getView().byId("componente").setValue("");
            this.getView().byId("grupos").setValue("");
            this.getView().byId("colegio").setValue("");
            this.getView().byId("fechaPlan").setValue("");
            this.getView().byId("fecha").setValue("");
            this.getView().byId("fechaCierre").setValue("");
        },
        onSubmit(){
            const _this = this;
            let newProduct = _this.obtenerValores();
            let aProductColl= this.getView().getModel().getData().VisitasB;
            aProductColl.unshift(newProduct);
            this.getView().getModel().refresh();
            
            
            MessageBox.success("Datos Cargados", {
                actions: [MessageBox.Action.OK],
                emphazisedAction: MessageBox.Action.OK,
                onClose(){
                    _this.onclearInput();
                }
            })
        },
        onSelectionChange: function() {
			
			const aSelectedItems = this.byId("table").getSelectedItems();
			const enableButtonDetail = this.byId("onDetailButton");

			if (aSelectedItems.length === 1) {
				enableButtonDetail.setEnabled(true);
			} else {
				enableButtonDetail.setEnabled(false);
			}
			
		},
        onDetail: function() {
            //Obtengo la tabla
            let oTable = this.byId("table"); 
            //Obtengo el item seleccionado y su contexto de vinculación (binding context)
            let oSelectedItem = oTable.getSelectedItem();
            console.log(oSelectedItem);
            
            //Obtiene el contexto de vinculación para el modelo
            let oBindingContext = oSelectedItem.getBindingContext(); 
            console.log(oBindingContext);
            
            //Obtiene el índice del item seleccionado en el modelo
            let iPath = oBindingContext.getPath(); 
            //Obtiene el índice del item seleccionado en la URL utilizando la ruta encodeURIComponent para evitar problemas de seguridad con los valores de las URLs
            let iIndex = iPath.split("/").slice(-1).pop();
            //Redirige a la ruta RouteDetail, con el índice codificado para evitar problemas de seguridad con los valores de las URLs en la URL ubicada en la barra de navegación
            let oRouter = this.getOwnerComponent().getRouter(); 
            //Redirige a la ruta RouteDetail, con el índice codificado para evitar problemas de seguridad con los valores de las URLs en la URL ubicada en la barra de navegación
            oRouter.navTo("RouteDetail", { index: window.encodeURIComponent(iIndex) });
            
            

		},
        onSearch: function (oEvent) {
                let aFilters = [];
                let searchValue = oEvent.getSource().getValue();
                if (searchValue && searchValue.length > 0) {
                    let filter = new Filter("Descripcion", FilterOperator.Contains, searchValue);
                    aFilters.push(filter);
                }
                let oList = this.byId("table");
			    let oBinding = oList.getBinding("items");
			    oBinding.filter(aFilters);
		}

        
       
    });
});
