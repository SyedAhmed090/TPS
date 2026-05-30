// ─── BASE LAYOUT ─────────────────────────────────────────────
function baseLayout(content: string, preheader = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>The Patch Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:Arial,sans-serif;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ''}
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:600px;background:#ffffff;border-top:4px solid #C8931A;">
      <!-- Header -->
      <tr>
        <td style="background:#0B1A2E;padding:24px 32px;">
          <div style="font-family:Georgia,serif;font-size:22px;color:#C8931A;letter-spacing:0.06em;font-weight:bold;">THE PATCH SOLUTIONS</div>
          <div style="font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;">Custom Patches Since 2000</div>
        </td>
      </tr>
      <!-- Body -->
      <tr><td style="padding:32px;">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr>
        <td style="background:#0B1A2E;padding:20px 32px;text-align:center;">
          <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0 0 6px;">
            The Patch Solutions · info@thepatchsolutions.com · 1-800-PATCHES
          </p>
          <p style="color:rgba(255,255,255,0.25);font-size:10px;margin:0;">
            © ${new Date().getFullYear()} The Patch Solutions. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

function btn(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:24px 0;">
    <tr><td style="background:#C8931A;padding:12px 28px;">
      <a href="${url}" style="color:#0B1A2E;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">${text}</a>
    </td></tr>
  </table>`
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:7px 0;font-size:13px;color:#666;font-weight:bold;width:40%;">${label}</td>
    <td style="padding:7px 0;font-size:13px;color:#0B1A2E;">${value}</td>
  </tr>`
}

// ─── 1. QUOTE CONFIRMATION ────────────────────────────────────
export function quoteConfirmation({ name, quote_id, patch_type, size, quantity, estimated_price, artwork_submitted }: {
  name: string; quote_id: string; patch_type: string; size: string; quantity: number; estimated_price?: number; artwork_submitted: boolean
}) {
  const shortId = quote_id.slice(0, 8).toUpperCase()
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Thanks, ${name}!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">We received your quote request and will get back to you with a detailed quote and free digital proof within <strong>1 business day</strong>.</p>
    <div style="background:#f9f6f0;border-left:4px solid #C8931A;padding:16px 20px;margin-bottom:24px;">
      <p style="font-size:12px;color:#999;margin:0 0 8px;letter-spacing:0.1em;text-transform:uppercase;font-weight:bold;">Quote Reference</p>
      <p style="font-family:monospace;font-size:18px;color:#0B1A2E;font-weight:bold;margin:0;">#${shortId}</p>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow('Patch Type', patch_type)}
      ${infoRow('Size', size)}
      ${infoRow('Quantity', quantity.toLocaleString() + ' patches')}
      ${estimated_price ? infoRow('Estimated Price', '$' + estimated_price.toFixed(2)) : ''}
    </table>
    ${artwork_submitted
      ? `<p style="color:#2a7a3a;font-size:13px;margin-bottom:16px;">✓ Your artwork file has been received.</p>`
      : `<p style="background:#fff8e6;border:1px solid #C8931A;padding:12px 16px;font-size:13px;color:#7a5c00;margin-bottom:16px;">
          <strong>Don't forget:</strong> Please email your artwork to <a href="mailto:info@thepatchsolutions.com" style="color:#C8931A;">info@thepatchsolutions.com</a> to ensure the fastest turnaround.
        </p>`
    }
    <h3 style="font-family:Georgia,serif;color:#0B1A2E;font-size:16px;margin:24px 0 12px;">What Happens Next</h3>
    <ol style="color:#555;font-size:13px;line-height:1.8;padding-left:20px;margin:0 0 24px;">
      <li>We review your request (within 1 business day)</li>
      <li>Our art team creates a free digital proof</li>
      <li>We send you the quote + proof for approval</li>
    </ol>
    ${btn('View Our Pricing Guide', 'https://www.thepatchsolutions.com/pricing')}
    <p style="color:#999;font-size:12px;">Questions? Reply to this email or call 1-800-PATCHES.</p>
  `
  return {
    subject: 'We received your quote request — The Patch Solutions',
    html: baseLayout(body, `Your quote request #${shortId} has been received.`),
    text: `Hi ${name},\n\nWe received your quote request (#${shortId}).\n\nPatch Type: ${patch_type}\nSize: ${size}\nQuantity: ${quantity}\n\nWe'll respond within 1 business day with a quote and free digital proof.\n\nThe Patch Solutions\ninfo@thepatchsolutions.com`,
  }
}

// ─── 2. QUOTE NOTIFICATION (admin) ───────────────────────────
export function quoteNotification({ quote_id, name, email, phone, patch_type, size, quantity, estimated_price, rush_order, artwork_url, special_notes, source_page }: {
  quote_id: string; name: string; email: string; phone?: string; patch_type: string; size: string; quantity: number; estimated_price?: number; rush_order?: boolean; artwork_url?: string; special_notes?: string; source_page?: string
}) {
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:22px;margin:0 0 16px;">New Quote Request</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${infoRow('Name', name)}
      ${infoRow('Email', `<a href="mailto:${email}" style="color:#C8931A;">${email}</a>`)}
      ${phone ? infoRow('Phone', phone) : ''}
      ${infoRow('Patch Type', patch_type)}
      ${infoRow('Size', size)}
      ${infoRow('Quantity', quantity.toLocaleString())}
      ${estimated_price ? infoRow('Est. Price', '$' + estimated_price.toFixed(2)) : ''}
      ${rush_order ? infoRow('Rush Order', '<strong style="color:#d44;">YES</strong>') : ''}
      ${source_page ? infoRow('Source Page', source_page) : ''}
      ${infoRow('Quote ID', quote_id)}
    </table>
    ${artwork_url ? `<p style="font-size:13px;margin-bottom:16px;">📎 <a href="${artwork_url}" style="color:#C8931A;">View Artwork File</a></p>` : '<p style="font-size:13px;color:#999;margin-bottom:16px;">No artwork file uploaded.</p>'}
    ${special_notes ? `<div style="background:#f9f6f0;padding:12px 16px;margin-bottom:16px;"><strong style="font-size:12px;color:#999;">NOTES:</strong><p style="font-size:13px;color:#333;margin:6px 0 0;">${special_notes}</p></div>` : ''}
    ${btn('View in Admin Dashboard', `https://www.thepatchsolutions.com/admin/quotes/${quote_id}`)}
  `
  return {
    subject: `🆕 New Quote — ${name} — ${patch_type} ×${quantity}`,
    html: baseLayout(body),
    text: `New quote from ${name} (${email})\nPatch: ${patch_type} | Size: ${size} | Qty: ${quantity}\nQuote ID: ${quote_id}`,
  }
}

// ─── 3. CONTACT CONFIRMATION ──────────────────────────────────
export function contactConfirmation({ name, subject }: { name: string; subject?: string }) {
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Message Received, ${name}!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">
      ${subject ? `We received your message about "<strong>${subject}</strong>". ` : 'We received your message. '}
      Our team will respond within <strong>1 business day</strong>.
    </p>
    <p style="color:#555;font-size:14px;line-height:1.6;">If your question is urgent, feel free to call us at <strong>1-800-PATCHES</strong> (Mon–Fri, 9am–6pm EST).</p>
    ${btn('Get a Free Quote', 'https://www.thepatchsolutions.com/free-quote')}
  `
  return {
    subject: 'Message received — The Patch Solutions',
    html: baseLayout(body, 'We received your message and will respond within 1 business day.'),
    text: `Hi ${name},\n\nWe received your message and will respond within 1 business day.\n\nThe Patch Solutions\ninfo@thepatchsolutions.com`,
  }
}

// ─── 4. CONTACT NOTIFICATION (admin) ─────────────────────────
export function contactNotification({ contact_id, name, email, phone, subject, message }: {
  contact_id: string; name: string; email: string; phone?: string; subject?: string; message: string
}) {
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:22px;margin:0 0 16px;">New Contact Message</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${infoRow('From', name)}
      ${infoRow('Email', `<a href="mailto:${email}" style="color:#C8931A;">${email}</a>`)}
      ${phone ? infoRow('Phone', phone) : ''}
      ${subject ? infoRow('Subject', subject) : ''}
    </table>
    <div style="background:#f9f6f0;border-left:4px solid #C8931A;padding:16px 20px;margin-bottom:24px;">
      <p style="font-size:13px;color:#333;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br/>')}</p>
    </div>
    ${btn('Reply via Email', `mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your message')}`)}
  `
  return {
    subject: `📬 New Message — ${subject || name}`,
    html: baseLayout(body),
    text: `New contact from ${name} (${email})\n\n${message}`,
  }
}

// ─── 5. SAMPLE CONFIRMATION ───────────────────────────────────
export function sampleConfirmation({ name }: { name: string }) {
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Sample Request Confirmed!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">Hi ${name}, we've received your request! We'll create your sample patch and send you high-resolution photos and a video so you can see the quality before placing your full order.</p>
    <div style="background:#f9f6f0;border-left:4px solid #C8931A;padding:12px 20px;margin-bottom:20px;">
      <p style="font-size:14px;color:#333;margin:0;line-height:1.6;">You'll receive photos and a video of your sample patch within a few business days — delivered straight to this email address.</p>
    </div>
    <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">Once you've seen the sample and are happy with the quality, we're ready to move forward with your full order whenever you are.</p>
    ${btn('Get a Free Quote While You Wait', 'https://www.thepatchsolutions.com/free-quote')}
  `
  return {
    subject: 'Your free sample request is confirmed — The Patch Solutions',
    html: baseLayout(body, 'Sample photos and video will be sent to your email within a few business days.'),
    text: `Hi ${name},\n\nWe've received your sample request. We'll create your sample patch and send you high-resolution photos and a video within a few business days.\n\nThe Patch Solutions`,
  }
}

// ─── 6. SAMPLE NOTIFICATION (admin) ──────────────────────────
export function sampleNotification({ name, email, phone, company, patchTypes, notes, requestId }: {
  name: string; email: string; phone?: string; company?: string; patchTypes?: string[]; notes?: string; requestId?: string
}) {
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:22px;margin:0 0 16px;">New Sample Request</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${infoRow('Name', name)}
      ${infoRow('Email', `<a href="mailto:${email}" style="color:#C8931A;">${email}</a>`)}
      ${phone ? infoRow('Phone', phone) : ''}
      ${company ? infoRow('Company', company) : ''}
      ${patchTypes?.length ? infoRow('Interested In', patchTypes.join(', ')) : ''}
      ${notes ? infoRow('Notes', notes) : ''}
    </table>
    <p style="color:#555;font-size:13px;">Send high-res photos and a video to <strong>${email}</strong> once the sample is ready.</p>
  `
  return {
    subject: `New Sample Request — ${name}`,
    html: baseLayout(body),
    text: `New sample request from ${name} (${email})\nSend sample photos and video to: ${email}`,
  }
}

// ─── 7. PROOF APPROVAL ───────────────────────────────────────
export function proofApproval({ name, order_id, proof_url }: { name: string; order_id: string; proof_url: string }) {
  const shortId = order_id.slice(0, 8).toUpperCase()
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Your Patch Proof Is Ready!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">Hi ${name}, your digital proof for order <strong>#${shortId}</strong> is ready for your review. Please take a moment to check all the details carefully before approving.</p>
    ${btn('View Your Proof', proof_url)}
    <div style="background:#f9f6f0;border-left:4px solid #C8931A;padding:16px 20px;margin-top:20px;">
      <p style="font-size:13px;color:#555;margin:0 0 8px;"><strong>To approve:</strong> Simply reply to this email with "Approved" or click the button above.</p>
      <p style="font-size:13px;color:#555;margin:0;"><strong>To request changes:</strong> Reply with your specific change requests. Revisions are always free.</p>
    </div>
    <p style="color:#999;font-size:12px;margin-top:20px;">⚡ Production begins immediately upon approval. Standard turnaround is 10–14 business days from approval.</p>
  `
  return {
    subject: 'Your patch proof is ready for approval — The Patch Solutions',
    html: baseLayout(body, 'Your digital proof is ready. Please review and approve to start production.'),
    text: `Hi ${name},\n\nYour proof for order #${shortId} is ready.\nView it here: ${proof_url}\n\nReply with "Approved" to start production, or with change requests for free revisions.\n\nThe Patch Solutions`,
  }
}

// ─── 8. ORDER IN PRODUCTION ───────────────────────────────────
export function orderInProduction({ name, order_id, patch_type, quantity, estimated_days }: {
  name: string; order_id: string; patch_type: string; quantity: number; estimated_days?: string
}) {
  const shortId = order_id.slice(0, 8).toUpperCase()
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Your Patches Are in Production!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">Great news, ${name}! Your order <strong>#${shortId}</strong> has entered production. Here's what's being made:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${infoRow('Order', `#${shortId}`)}
      ${infoRow('Patch Type', patch_type)}
      ${infoRow('Quantity', quantity.toLocaleString() + ' patches')}
      ${estimated_days ? infoRow('Est. Completion', estimated_days) : ''}
    </table>
    <p style="color:#555;font-size:14px;line-height:1.6;">We'll send you another update as soon as your order ships. If you have any questions, just reply to this email.</p>
  `
  return {
    subject: 'Your patches are in production! — The Patch Solutions',
    html: baseLayout(body),
    text: `Hi ${name},\n\nOrder #${shortId} is in production.\n${patch_type} × ${quantity}\n\nWe'll notify you when it ships.\n\nThe Patch Solutions`,
  }
}

// ─── 9. ORDER SHIPPED ─────────────────────────────────────────
export function orderShipped({ name, order_id, tracking_number, carrier, tracking_url }: {
  name: string; order_id: string; tracking_number: string; carrier: string; tracking_url?: string
}) {
  const shortId = order_id.slice(0, 8).toUpperCase()
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Your Patches Are On the Way! 📦</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">Hi ${name}, great news — order <strong>#${shortId}</strong> has shipped!</p>
    <div style="background:#f9f6f0;border-left:4px solid #C8931A;padding:16px 20px;margin-bottom:24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow('Carrier', carrier)}
        ${infoRow('Tracking #', `<strong style="font-family:monospace;">${tracking_number}</strong>`)}
      </table>
    </div>
    ${tracking_url ? btn('Track Your Package', tracking_url) : ''}
    <p style="color:#999;font-size:12px;margin-top:16px;">Allow 24–48 hours for tracking to activate. Questions? Reply to this email.</p>
  `
  return {
    subject: 'Your patches are on the way! 📦 — The Patch Solutions',
    html: baseLayout(body, `Order #${shortId} has shipped via ${carrier}.`),
    text: `Hi ${name},\n\nOrder #${shortId} has shipped!\nCarrier: ${carrier}\nTracking: ${tracking_number}\n${tracking_url ? `Track here: ${tracking_url}` : ''}\n\nThe Patch Solutions`,
  }
}

// ─── 10. ORDER DELIVERED ──────────────────────────────────────
export function orderDelivered({ name, order_id, patch_type }: { name: string; order_id: string; patch_type: string }) {
  const shortId = order_id.slice(0, 8).toUpperCase()
  const body = `
    <h2 style="font-family:Georgia,serif;color:#0B1A2E;font-size:26px;margin:0 0 8px;">Your Patches Have Arrived!</h2>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 20px;">Hi ${name}, your ${patch_type} patches (order <strong>#${shortId}</strong>) should have arrived. We hope they turned out exactly as you envisioned!</p>
    <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:24px;">If you're happy with your patches, we'd love it if you shared a photo or left a review — it means the world to a small business like ours.</p>
    ${btn('Reorder or Get a New Quote', 'https://www.thepatchsolutions.com/free-quote')}
    <p style="color:#999;font-size:13px;margin-top:16px;">Not completely satisfied? Reply to this email and we'll make it right. Your satisfaction is 100% guaranteed.</p>
  `
  return {
    subject: 'Your patches have arrived! — The Patch Solutions',
    html: baseLayout(body),
    text: `Hi ${name},\n\nYour ${patch_type} patches (order #${shortId}) should have arrived. We hope they're perfect!\n\nNeed to reorder? Visit thepatchsolutions.com/free-quote\n\nThe Patch Solutions`,
  }
}
