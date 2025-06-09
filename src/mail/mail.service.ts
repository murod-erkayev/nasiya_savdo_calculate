import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/scheam/user.entity';
import { Admin } from '../admin/entities/admin.entity';
@Injectable()
export class MailService {
    constructor(private readonly mailerSerivce: MailerService) {}

    async sendMailUser(user:User){
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
        console.log(url);

        await this.mailerSerivce.sendMail({
            to: user.email,
            subject: 'Welcome to Hususiy Shifohona app',
            template: './confirmation', 
            context: { 
                name: user.first_name,
                url,
             }, 
        });
    }
    async sendMailAdmin(admin:Admin){
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        console.log(url);

        await this.mailerSerivce.sendMail({
            to: admin.email,
            subject: 'Welcome to Saiya Savdo appclication',
            template: './confirmation', 
            context: { 
                name: admin.username,
                url,
             }, 
        });
    }
    // async sendMailDocotr(doctor:Doctor){
    //     const url = `${process.env.API_HOST}/api/doctors/activate/${doctor.activation_link}`;
    //     console.log(url);
    //     await this.mailerSerivce.sendMail({
    //         to: doctor.email,
    //         subject: 'Welcome to Hususiy Shifohona app',
    //         template: './confirmation', 
    //         context: { 
    //             name: doctor.full_name, 
    //             url, 
    //          }, 
    //     });
    // }
    // async sendMailPatient(patient:Patient){
    //     const url = `${process.env.API_HOST}/api/patients/activate/${patient.activation_link}`;
    //     console.log(url);

    //     await this.mailerSerivce.sendMail({
    //         to: patient.email,
    //         subject: 'Welcome to Hususiy Shifohona app',
    //         template: './confirmation', 
    //         context: { 
    //             name: patient.full_name, 
    //             url, 
    //          }, 
    //     });
    // }
// async sendMailDoctorAppointment(doctor: Doctor, appointment: Appointment, patient: Patient) {
//     const url = `${process.env.API_HOST}/api/appointments/confirm/${appointment.confirmation_link}`;
//     console.log(url);

//     await this.mailerSerivce.sendMail({
//       to: doctor.email,
//       subject: 'New Appointment Request',
//       template: './appointment_confirmation', // Yangi shablon
//       context: {
//         doctorName: doctor.full_name,
//         patientName: patient.full_name,
//         purpose: appointment.purpose,
//         url,
//       },
//     });
//   }
}
