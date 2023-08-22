import sgMail from "@sendgrid/mail";

export default async (req, res) => {
  if (req.method === "POST") {
    sgMail.setApiKey(
      "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"
    );

    const { name, email, phoneNumber, flavor, size } = req.body;

    const msg = {
      to: "Sokesswig@gmail.com",
      from: "orders@celestial-deep.com",
      subject: "New Juice Order",
      text: `
        Name: ${name}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Flavor: ${flavor}
        Size: ${size}
      `,
      html: `
        <h3>New Juice Order</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Flavor: ${flavor}</p>
        <p>Size: ${size}</p>
      `,
    };

    try {
      await sgMail.send(msg);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};
