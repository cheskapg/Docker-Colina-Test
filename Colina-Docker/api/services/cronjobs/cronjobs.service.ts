import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointments } from 'src/appointments/entities/appointments.entity';
import { Repository } from 'typeorm'; import { DateTime } from 'luxon';
import { In } from 'typeorm';

@Injectable()
export class CronjobsService {
    constructor(
        @InjectRepository(Appointments)
        private appointmentsRepository: Repository<Appointments>,

    ) { }

    // @Cron('* * * * * *') // Cron job to check appointments every minute
    // async checkDailyAppointments() {
    //     const currentDateTime = DateTime.local(); // Get current date and time using Luxon

    //     const formattedDate = currentDateTime.toFormat('yyyy-MM-dd');
    //     console.log('Checking appointments for date:', formattedDate);
    //     console.log('currentDate now', currentDateTime);

    //     const appointments = await this.appointmentsRepository.find({
    //         where: {
    //             appointmentDate: formattedDate,
    //             appointmentStatus: In(['Scheduled', 'On-going', 'Patient-IN']),
    //         },
    //     });

    //     for (const appointment of appointments) {
    //         const appointmentDateTime = this.parseDateTime(appointment.appointmentDate, appointment.appointmentTime);
    //         const appointmentEndDateTime = this.parseDateTime(appointment.appointmentDate, appointment.appointmentEndTime);
    //         console.log('appointmentDateTime:', appointmentDateTime);
    //         console.log('appointmentEndDateTime:', appointmentEndDateTime);
    //         console.log('currentDateTime:', currentDateTime);
    //         if (currentDateTime > appointmentDateTime && currentDateTime < appointmentEndDateTime) {
    //             if (appointment.appointmentStatus === 'Scheduled') {
    //               await this.updateAppointmentStatus(appointment, 'On-going');
    //               console.log('Marked ongoing for appointment:', appointment.id);
    //             } else if (appointment.appointmentStatus === 'On-going') {
    //               console.log('Appointment already ongoing:', appointment.id);
    //             } else if (appointment.appointmentStatus === 'Patient-IN') {
    //               console.log('Patient already checked in:', appointment.id);
    //             }
    //           } else if (currentDateTime > appointmentEndDateTime) {
    //             if (appointment.appointmentStatus === 'On-going') {
    //               await this.updateAppointmentStatus(appointment, 'Missed');
    //               console.log('Marked missed for appointment:', appointment.id);
    //             } else if (appointment.appointmentStatus === 'Patient-IN') {
    //               await this.updateAppointmentStatus(appointment, 'Done');
    //               console.log('Marked Done for appointment:', appointment.id);
    //             } else if (appointment.appointmentStatus === 'Scheduled') {
    //               await this.updateAppointmentStatus(appointment, 'Missed');
    //               console.log('Marked missed for appointment:', appointment.id);
    //             }
    //           } else if (currentDateTime < appointmentDateTime && appointment.appointmentStatus !== 'Done') {
    //             await this.updateAppointmentStatus(appointment, 'Scheduled');
    //             console.log('Marked scheduled for appointment:', appointment.id);
    //           }
    //     }
    // }


    // @Cron('* * * * *') // Cron job to check appointments every minute
    // async checkDailyAppointments() {
    //     const currentDateTime = DateTime.local(); // Get current date and time using Luxon
    //     const formattedDate = currentDateTime.toFormat('yyyy-MM-dd');
    //     console.log('Checking appointments for date:', formattedDate);

    //     const appointments = await this.appointmentsRepository.find({
    //         where: {
    //             appointmentDate: formattedDate,
    //             appointmentStatus: 'scheduled' || 'ongoing',
    //         },
    //     });

    //     for (const appointment of appointments) {
    //         const appointmentDateTime = this.parseDateTime(appointment.appointmentDate, appointment.appointmentTime);
    //         const appointmentEndDateTime = this.parseDateTime(appointment.appointmentDate, appointment.appointmentEndTime);
    //         console.log('appointmentDateTime:', appointmentDateTime);
    //         console.log('appointmentEndDateTime:', appointmentEndDateTime);
    //         console.log('currentDateTime:', currentDateTime);
    //         if (currentDateTime >= appointmentDateTime && currentDateTime <= appointmentEndDateTime) {
    //             await this.updateAppointmentStatus(appointment, 'ongoing');
    //             console.log('Marked ongoing for appointment:', appointment.id);
    //         } else if (currentDateTime > appointmentEndDateTime) {
    //             if (appointment.appointmentStatus !== 'successful') {
    //                 await this.updateAppointmentStatus(appointment, 'missed');
    //                 console.log('Marked missed for appointment:', appointment.id);
    //             }
    //         } else {
    //             if (appointment.appointmentStatus !== 'successful') {
    //                 await this.updateAppointmentStatus(appointment, 'scheduled');
    //                 console.log('Marked scheduled for appointment:', appointment.id);
    //             }
    //         }
    //     }
    // }

    async updateAppointmentStatus(appointment: Appointments, status: string) {
        appointment.appointmentStatus = status;
        await this.appointmentsRepository.save(appointment);
    }

    // parseDateTime(dateString: string, timeString: string): DateTime {
    //     const [year, month, day] = dateString.split('-').map(Number);
    //     const [hoursString, minutesString] = timeString.split(":");
    //     let hours = parseInt(hoursString, 10);
    //     const minutes = parseInt(minutesString.substring(0, 2), 10);
    //     const isPM = timeString.endsWith("PM");

    //     if (isPM && hours !== 12) {
    //         hours += 12;
    //     } else if (!isPM && hours === 12) {
    //         hours = 0;
    //     }

    //     return DateTime.fromObject({
    //         year,
    //         month,
    //         day,
    //         hour: hours,
    //         minute: minutes,
    //     });
    // }
    parseDateTime(dateString: string, timeString: string): DateTime {
        const [year, month, day] = dateString.split('-').map(Number);
        const [hoursString, minutesString] = timeString.split(":");
        const hours = parseInt(hoursString, 10);
        const minutes = parseInt(minutesString, 10);

        // Create a Luxon DateTime object for the appointment
        const appointmentDateTime = DateTime.fromObject({
            year,
            month,
            day,
            hour: hours,
            minute: minutes,
        });

        // Return the appointment DateTime object
        return appointmentDateTime;
    }
}