import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not set in the environment.');
    }
    this.resend = new Resend(apiKey);
  }

  async sendEmail(to: string | string[], subject: string, html: string) {
    try {
      const data = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to,
        subject,
        html,
      });

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error?.message ?? 'Unknown error' };
    }
  }
}
