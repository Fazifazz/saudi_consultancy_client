import axios from 'axios';

export interface OtpGenerateParams {
  purpose: string;
  module?: string;
  ttlSeconds?: number;
}

export interface GenerateOtpResponse {
  message: string;
  data: {
    sessionId: string;
    expiresAt: string;
    email: string;
    purpose: string;
    module: string | null;
  };
}

export interface ValidateOtpResponse {
  message: string;
  success?: boolean;
  verified?: boolean;
  data?: any;
}

export interface ResendOtpResponse {
  message: string;
  data?: {
    sessionId: string;
    expiresAt: string;
  };
}

export const generateOtp = async (params: OtpGenerateParams): Promise<GenerateOtpResponse> => {
  const res = await axios.post('/api/otp/generate', params);
  return res.data;
};

export const validateOtp = async (
  params: OtpGenerateParams & { otp: string }
): Promise<ValidateOtpResponse> => {
  const res = await axios.post('/api/otp/validate', params);
  return res.data;
};

export const resendOtp = async (params: OtpGenerateParams): Promise<ResendOtpResponse> => {
  const res = await axios.post('/api/otp/resend', params);
  return res.data;
};
