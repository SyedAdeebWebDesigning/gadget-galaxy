"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
	const emailName: string | any = formData.get("emailName");
	const message = "Thanks for purchasing with us!";
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: emailName,
		subject: "Order confirmation from Gadget Galaxy E-Commerce",
		text: message,
	});
};
