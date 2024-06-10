import { defineStore } from "pinia";
import { FeeService, PaymentService } from "../services/income.service";
import { Fee, Payment, PaymentsRequest } from "../types";

const feeService = new FeeService<Fee>();
const paymentService = new PaymentService<Payment>();

export const useFeeStore = defineStore("fee", {
  state: () => ({
    fee: {} as Fee,
    fees: [] as Fee[],
  }),
  actions: {
    //fee
    setFee(fee: Fee) {
      this.fee = fee;
    },
    async createFee(fee: Fee) {
      let result = await feeService.CreateFee(fee);
      return result;
    },
    async fetchFees() {
      let response = await feeService.GetFees();
      this.fees = response.data;
    },
    async getFee(id: string) {
      let response = await feeService.GetFee(id);
      this.fee = response.data;
    },
    async updateFee(fee: Fee) {
      let response = await feeService.UpdateFee(fee);
      return response;
    },
    async deleteFee(fee: Fee) {
      let response = await feeService.DeleteFee(fee);
      return response;
    },
  },
});
export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payment: {} as Payment,
    payments: [] as Payment[],
  }),
  actions: {
    //payment
    setPayment(payment: Payment) {
      this.payment = payment;
    },
    async createPayment(payment: Payment) {
      let result = await paymentService.CreatePayment(payment);
      return result;
    },
    async createPayments(paymentsRequest: PaymentsRequest): Promise<Boolean> {
      let result = await paymentService.CreatePayments(paymentsRequest);
      return result;
    },
    async fetchPayments() {
      let response = await paymentService.GetPayments();
      this.payments = response.data;
    },
    async getPaymentsByTraineeId(id: string) {
      let response = await paymentService.GetPaymentsByTraineeId(id);
      this.payments = response.data;
    },
    async getPaymentsBetweenDates(startTime: string, endTime: string) {
      let response = await paymentService.GetPaymentsBetweenDates(
        startTime,
        endTime
      );
      this.payments = response.data;
      return this.payments;
    },
    /*async updatePayment(payment: Payment) {
      let response = await paymentService.UpdatePayment(payment);
      return response;
    },*/
    async deletePayment(payment: Payment) {
      let response = await paymentService.DeletePayment(payment);
      return response;
    },
  },
});
