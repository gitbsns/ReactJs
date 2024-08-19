export default Object.freeze({
  getAllCurrencies: "signup_svc/pv/currencies/getAllCurrencies",
  getAllLanguages: "signup_svc/pv/languages/getAllLanguages",
  getAllCustomerBusiness:
    "customer_svc/pv/customerBusiness/getAllCustomerBusiness",
  getAllServicesByBusinessId:
    "serviceinventory_svc/pb/Service/GetAllServicesByBusinessId",
  invoices: "invoicegeneration_svc/pb/invoices/",
  paymentTerms: "invoicegeneration_svc/pb/payment-terms/",
  taxes: "invoicegeneration_svc/pb/taxes",
  getAllListingPreferencesByUserId:
    "serviceinventory_svc/pv/ListingPreferences/getAllListingPreferenceByUserId",
  invoiceDynamicList: "invoicegeneration_svc/pb/get-invoice-column-preference/",
  invoicePreferencesList:
    "invoicegeneration_svc/pb/get_all_invoice_column_preference/",
  invoiceAddColumnPreferences:
    "invoicegeneration_svc/pb/column-preference/add-user-listing-preference/",
  createInvoice: "invoicegeneration_svc/pb/create-invoice/",
  createProformaInvoice: "invoicegeneration_svc/pb/create-performa-invoice/",
  getServiceAttributesByServiceId:
    "serviceinventory_svc/pv/ServiceAttribute/GetServiceAttributeByServiceId",
  billPaymentTerms: "bills_svc/pb/payment-terms/",
  billTaxes: "bills_svc/pb/taxes",
  createBill: "bills_svc/pb/create-bill/",
  bills: "bills_svc/pb/bills/",
  debitNotes: "bills_svc/pb/debit-notes/",
  billsDynamicList: "bills_svc/pb/get-bill-column-preference/",
  billPreferencesList: "bills_svc/pb/get_all_bill_column_preference/",
  billAddColumnPreferences:
    "bills_svc/pb/column-preference/add-user-listing-preference/",
  getNewRefreshToken: "signup_svc/pb/users/getnewRefreshToken",
  journalDynamicList: "journal_svc/pb/get-journal-column-preference/",
  journalAddColumnPreferences:
    "journal_svc/pb/column-preference/add-user-listing-preference/",
  journalPreferencesList: "journal_svc/pb/get_all_journal_column_preference/",
  getUserById: "signup_svc/pv/users/getUserById",
  getBookingId: "booking_svc/pv/getBookingId",
});
