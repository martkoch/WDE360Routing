sap.ui.define(["com/sap/training/controller/BaseController"], function(Controller) {
	"use strict";
	return Controller.extend("com.sap.training.controller.Carrier", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.training.view.Carrier
		 */
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("carrier").attachMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			this._sCarrierId = oArgs.carrierId;
			oView = this.getView();

			oView.bindElement({
				path: "/CarrierSet('" + this._sCarrierId + "')",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oView.setBusy(true);
					},
					dataReceived: function() {
						oView.setBusy(false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oElementBinding;

			oElementBinding = this.getView().getElementBinding();

			// No data for the binding
			if (oElementBinding && !oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.training.view.Carrier
		 */ //	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.training.view.Carrier
		 */ //	onAfterRendering: function() {
		//
		//	},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.training.view.Carrier
		 */ //	onExit: function() {
		//
		//	}

	});
});