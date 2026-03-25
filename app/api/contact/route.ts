import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'FoodHub Contact <contact@foodhub.tn>',
      to: 'contact@hamzamissaoui.dev',
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; margin-bottom: 20px;">Nouveau message de contact</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Nom:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong>Message:</strong></p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-left: 4px solid #7c3aed; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Cet email a été envoyé depuis le formulaire de contact de FoodHub Tunisie
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
