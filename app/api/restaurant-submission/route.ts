import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const getConfirmationEmail = (restaurantName: string) => ({
  subject: 'Votre demande KmandyFood a été reçue!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; font-size: 32px; margin-bottom: 10px;">🌮 KmandyFood</h1>
        <p style="color: #6b7280; font-size: 16px;">Votre partenaire digital pour la croissance de votre restaurant</p>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 15px;">Merci pour votre intérêt, ${restaurantName}!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          Nous avons bien reçu votre demande pour rejoindre KmandyFood. Notre équipe commerciale 
          étudiera votre dossier et vous contactera dans les 24 heures pour discuter de vos besoins 
          et vous présenter une démo personnalisée.
        </p>
      </div>
      
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px;">
        <h3 style="color: #92400e; font-size: 18px; margin-bottom: 10px;">📋 Prochaines étapes:</h3>
        <ul style="color: #78350f; font-size: 16px; line-height: 1.6; padding-left: 20px;">
          <li>Analyse de votre demande par notre équipe</li>
          <li>Contact téléphonique sous 24h</li>
          <li>Démo personnalisée de la plateforme</li>
          <li>Proposition commerciale adaptée</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">Ce que vous obtenez avec KmandyFood:</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: left;">
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <div style="color: #16a34a; font-weight: bold; margin-bottom: 5px;">📱 Menu numérique</div>
            <div style="color: #4b5563; font-size: 14px;">Menu interactif et illimité</div>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <div style="color: #16a34a; font-weight: bold; margin-bottom: 5px;">📊 Analytics</div>
            <div style="color: #4b5563; font-size: 14px;">Rapports détaillés et insights</div>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <div style="color: #16a34a; font-weight: bold; margin-bottom: 5px;">🎯 Marketing</div>
            <div style="color: #4b5563; font-size: 14px;">Visibilité accrue et fidélisation</div>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px;">
            <div style="color: #16a34a; font-weight: bold; margin-bottom: 5px;">📞 Support 24/7</div>
            <div style="color: #4b5563; font-size: 14px;">Assistance continue</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; background: #7c3aed; border-radius: 12px;">
        <p style="color: white; font-size: 18px; margin-bottom: 15px;">Une question? Contactez-nous!</p>
        <div style="color: white; font-size: 16px;">
          📧 contact@kmandyfood.tn | 📱 +216 XX XXX XXX
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
        <p>À très bientôt pour transformer votre restaurant! 🚀</p>
      </div>
    </div>
  `
});

const getAdminNotificationEmail = (submission: any) => ({
  subject: `🍕 Nouvelle demande restaurant: ${submission.restaurantName}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #7c3aed; font-size: 32px; margin-bottom: 10px;">🌮 KmandyFood - Admin</h1>
        <p style="color: #6b7280; font-size: 16px;">Nouvelle demande de restaurant</p>
      </div>
      
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px;">
        <h2 style="color: #92400e; font-size: 24px; margin-bottom: 15px;">📋 Nouvelle demande reçue!</h2>
        <p style="color: #78350f; font-size: 16px;">
          Un nouveau restaurant souhaite rejoindre la plateforme KmandyFood.
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 20px;">📊 Détails du restaurant:</h3>
        <div style="display: grid; gap: 15px;">
          <div><strong style="color: #374151;">Nom:</strong> <span style="color: #6b7280;">${submission.restaurantName}</span></div>
          <div><strong style="color: #374151;">Email:</strong> <span style="color: #6b7280;">${submission.email}</span></div>
          <div><strong style="color: #374151;">Téléphone:</strong> <span style="color: #6b7280;">${submission.phone}</span></div>
          <div><strong style="color: #374151;">Adresse:</strong> <span style="color: #6b7280;">${submission.address}</span></div>
          ${submission.description ? `<div><strong style="color: #374151;">Description:</strong> <span style="color: #6b7280;">${submission.description}</span></div>` : ''}
          <div><strong style="color: #374151;">Date de soumission:</strong> <span style="color: #6b7280;">${new Date(submission.createdAt).toLocaleString('fr-TN')}</span></div>
          <div><strong style="color: #374151;">ID de soumission:</strong> <span style="color: #6b7280;">${submission.id}</span></div>
        </div>
      </div>
      
      <div style="text-align: center; margin-bottom: 30px;">
        <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">🚀 Actions requises:</h3>
        <div style="display: inline-block; text-align: left;">
          <div style="color: #4b5563; font-size: 16px; line-height: 1.8;">
            ✅ Analyser la demande<br/>
            ✅ Contacter le restaurant sous 24h<br/>
            ✅ Préparer une démo personnalisée<br/>
            ✅ Envoyer proposition commerciale
          </div>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; background: #dc2626; border-radius: 12px;">
        <p style="color: white; font-size: 18px; margin-bottom: 10px;">⚠️ Priorité: Élevée</p>
        <p style="color: white; font-size: 16px;">À traiter dans les plus brefs délais</p>
      </div>
    </div>
  `
});

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();

    // Validate required fields
    const requiredFields = ['restaurantName', 'email', 'phone', 'address'];
    for (const field of requiredFields) {
      if (!submission[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est obligatoire` },
          { status: 400 }
        );
      }
    }

    // Add timestamp and ID
    const submissionData = {
      id: Date.now().toString(),
      ...submission,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save to file (in production, you'd save to a database)
    const submissionsPath = join(process.cwd(), 'data', 'submissions.json');

    try {
      // Read existing submissions
      let submissions = [];
      try {
        const fs = require('fs');
        if (fs.existsSync(submissionsPath)) {
          const fileContent = fs.readFileSync(submissionsPath, 'utf8');
          submissions = JSON.parse(fileContent);
        }
      } catch (error) {
        // File doesn't exist or is empty, start with empty array
        submissions = [];
      }

      // Add new submission
      submissions.push(submissionData);

      // Write back to file
      const fs = require('fs');
      writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));

    } catch (fileError) {
      console.error('Error saving submission:', fileError);
      // Continue anyway - we'll still send email notification
    }

    // Send email notifications
    try {
      // Send confirmation email to restaurant owner
      const confirmationEmail = getConfirmationEmail(submissionData.restaurantName);
      await resend.emails.send({
        from: 'KmandyFood <contact@kmandyfood.tn>',
        to: [submissionData.email],
        ...confirmationEmail,
      });

      // Send notification email to admin
      const adminEmail = getAdminNotificationEmail(submissionData);
      await resend.emails.send({
        from: 'KmandyFood <contact@kmandyfood.tn>',
        to: ['admin@kmandyfood.tn'], // Change this to your admin email
        ...adminEmail,
      });

      console.log('✅ Emails sent successfully');
    } catch (emailError) {
      console.error('❌ Error sending emails:', emailError);
      // Continue anyway - the submission is still saved
    }

    return NextResponse.json({
      message: 'Votre demande a été envoyée avec succès',
      submissionId: submissionData.id
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissionsPath = join(process.cwd(), 'data', 'submissions.json');

    const fs = require('fs');
    if (fs.existsSync(submissionsPath)) {
      const fileContent = fs.readFileSync(submissionsPath, 'utf8');
      const submissions = JSON.parse(fileContent);

      return NextResponse.json({
        submissions: submissions.reverse(), // Show newest first
        total: submissions.length
      });
    } else {
      return NextResponse.json({
        submissions: [],
        total: 0
      });
    }
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des soumissions' },
      { status: 500 }
    );
  }
}
