import { PaymentsRequest } from "../types";
import api from "../utils/axios";
import { AxiosResponse } from "axios";

export class FeeService<Fee> {
  async CreateFee(fee: Fee): Promise<any> {
    try {
      const response: AxiosResponse<any> = await api.post("/api/fee", fee);
      if (response.status === 200 || response.status === 201) {
        return true;
      } else {
        console.error("Failed to create fee:", response.status, response.data);
        return false;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Aquí sabemos que 'error' es un objeto Error estándar de JavaScript
        console.error("Error in CreateFee:", error.message);
      } else {
        // Si el error no es de tipo Error, aún se maneja de forma general
        console.error("An unexpected error occurred:", error);
      }
      return false;
    }
  }
  async GetFees(): Promise<any> {
    const response: AxiosResponse<Array<Fee>> = await api.get("/api/fee");
    return response.data;
  }
  async GetFee(id: string): Promise<any> {
    const response: AxiosResponse<Fee> = await api.get("/api/fee/" + id);
    return response.data;
  }
  async UpdateFee(fee: Fee): Promise<any> {
    const response: AxiosResponse<any> = await api.put("/api/fee", fee);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }
  async DeleteFee(fee: Fee): Promise<any> {
    const response: AxiosResponse<any> = await api.delete("/api/fee", {
      data: fee,
    });
    return response;
  }
}

export class PaymentService<Payment> {
  async CreatePayment(payment: Payment): Promise<any> {
    const response: AxiosResponse<any> = await api.post(
      "/api/payment",
      payment
    );
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }
  async CreatePayments(paymentsRequest: PaymentsRequest): Promise<Boolean> {
    const response: AxiosResponse<any> = await api.post(
      "/api/payments",
      paymentsRequest
    );
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return false;
    }
  }
  async GetPayments(): Promise<any> {
    const response: AxiosResponse<Array<Payment>> = await api.get(
      "/api/payment"
    );
    return response.data;
  }
  async GetPaymentsBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<any> {
    const response: AxiosResponse<Array<Payment>> = await api.get(
      "/api/payment/GetBetweenDates/" + startTime + "/" + endTime
    );
    return response.data;
  }
  async GetPaymentsByTraineeId(id: string): Promise<any> {
    const response: AxiosResponse<Payment> = await api.get(
      "/api/payment/GetByTraineeId/" + id
    );
    return response.data;
  }
  /*async UpdatePayment(payment: Payment): Promise<any> {
    const response: AxiosResponse<any> = await api.put("/api/payment", payment);
    if (response.status === 200 || response.status === 201) {
      return true;
    } else {
      return response;
    }
  }*/
  async DeletePayment(payment: Payment): Promise<any> {
    const response: AxiosResponse<any> = await api.delete("/api/payment", {
      data: payment,
    });
    return response;
  }
}
