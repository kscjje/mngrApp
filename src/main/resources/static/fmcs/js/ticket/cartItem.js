'use strict';
class CartItem {
    constructor(CartId, data) {

        this.CartId = CartId;
        this.ProductId = data.ID;
        this.ProgramName = data.ProgramName;
        this.UnitPrice = data.UnitPrice;
        this.PolicyGroupName = data.PolicyGroupName || pricePolicyText(data);
        this.Quantity = ko.observable(data.Quantity || 1);
        this.ListPrice = this.UnitPrice;
        this.ListAmount = ko.observable(this.Quantity() * this.ListPrice);
        this.Discountable = data.Discountable;

        this.NetPrice = ko.observable(this.ListPrice);
        this.NetAmount = ko.observable(this.Quantity() * this.ListPrice);
        this.DiscountId = ko.observable('0000');
        this.DiscountRate = ko.observable();
        this.SalePrice = ko.observable(0);
        this.SaleAmount = ko.observable(0);
        this.Taxable = data.Taxable;
        this.TaxAmount = ko.observable(this.Taxable ? this.NetAmount() * 0.1 : 0);
        this.QuantityInstance = {};
        this.DiscountedInfo = ko.observable(null)
        this.RoundOfUseId  = data.RoundOfUseId;
        this.RoundOfUseName = data.RoundOfUseName;
    }
}