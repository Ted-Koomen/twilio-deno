import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Twilio } from '../lib/Twilio.ts';


const twilioClient = new Twilio(config().ACCOUNT_SID, config().AUTH_TOKEN, config().FROM_NUMBER)

twilioClient.send(
    {
        to: 'TEST',
        message: 'typescript test'
    }
)