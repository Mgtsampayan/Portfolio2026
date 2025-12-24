# Nodemailer Configuration Guide

This project uses Nodemailer for sending emails. While it is configured for Mailtrap by default (for testing), you should switch to a robust provider like Gmail or Resend for production.

## 1. Gmail Setup

> [!WARNING]
> Do not use your plain password! You must use an **App Password**.

1.  Go to your [Google Account Security](https://myaccount.google.com/security) page.
2.  Enable **2-Step Verification** if it isn't already.
3.  Search for **App Passwords** (or go [here](https://myaccount.google.com/apppasswords)).
4.  Create a new app password (name it "Portfolio").
5.  Update your `env.local` or `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

Note: Port `465` uses SSL (Secure). Port `587` uses TLS. The app automatically detects this.

## 2. Resend Setup (Recommended)

Resend provides a better deliverability and developer experience.

1.  Sign up at [Resend.com](https://resend.com).
2.  Add and verify your domain.
3.  Generate an API Key.
4.  Get your SMTP settings from the [SMTP Settings](https://resend.com/docs/dashboard/emails/smtp) page.
5.  Update your `.env`:

```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=re_123456789...
```

## 3. Rate Limiting

The contact form is protected by Rate Limiting using Redis.

- **Configure Limits**: Adjust `RATE_LIMIT_MAX` (default 5) and `RATE_LIMIT_WINDOW_SECONDS` (default 3600/1 hour) in `.env`.
- **Redis Requirement**: Ensure `REDIS_URL` is set. If Redis is down, the rate limiter will fail open (allow requests) to prevent blocking legitimate users, but a warning will be logged.
