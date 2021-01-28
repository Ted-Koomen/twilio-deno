import { TwilioResponse } from './types/TwilioResponse.ts';
import { PostBody } from './types/PostBody.ts'
import { SendParams } from './types/SendParams.ts'

export class Twilio {
    accountSID: string
    authToken: string
    headers: Headers
    fromNumber: string

    constructor(accountSID: string, authToken: string, fromNumber: string) {
        this.accountSID = accountSID
        this.authToken = authToken
        this.headers = this._genHeaders()
        this.fromNumber = fromNumber
    }

    async send(sendParams: SendParams) {
        try {
            const response = await this._sendMessage(sendParams);
            console.log(response)
        } catch (e) {
            throw new Error(e)
        }
    }


    _genPostBody(data: URLSearchParams): PostBody {
        return {
            method: 'POST',
            headers: this.headers,
            body: data.toString()
        }
    }

    _genHeaders(): Headers {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Basic ${btoa(this.accountSID + ':' + this.authToken)}`)
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')

        return headers;
    }

    _genPostUrl(): string {
        return `https://api.twilio.com/2010-04-01/Accounts/${this.accountSID}/Messages.json`
    }

    _formatFormData(formData: SendParams): URLSearchParams{
        const formattedData = new URLSearchParams();
        formattedData.append('Body', formData['message'])
        formattedData.append('From', this.fromNumber)
        formattedData.append('To', formData['to'])

        return formattedData;
    }
    
    async _sendMessage(sendParams: SendParams) {
        try {
            const url: string = this._genPostUrl()
            const formattedParams = this._formatFormData(sendParams)

            const response = await fetch(url, this._genPostBody(formattedParams))

            return response
        } catch (e) {
            console.log('e')
        }
    }
}