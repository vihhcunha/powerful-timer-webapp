import { FormArray, FormGroup } from '@angular/forms';

export class GenericFormValidator{
 
    constructor(private validationMessages: ValidationMessages){ }

    public buildMessages(form: FormGroup): DisplayMessage {
        let messages: DisplayMessage = {};

        for(let controlKey in form.controls){
            if(form.controls.hasOwnProperty(controlKey)){
                let control = form.controls[controlKey];

                if(control instanceof FormGroup){
                    let childMessages = this.buildMessages(form);
                    Object.assign(messages, childMessages);
                }
                if(control instanceof FormArray){
                    let controls = control.controls;
                    var childMessages = { [controlKey]: [] };
                    controls.forEach(x => { 
                        if(x instanceof FormGroup){
                            childMessages[controlKey].push(this.buildMessages(x as FormGroup) as never)
                        }
                    });
                    Object.assign(messages, childMessages);
                }
                else{
                    if(this.validationMessages[controlKey]){
                        messages[controlKey] = '';
                        if((control.dirty || control.touched) && control.errors){
                            Object.keys(control.errors).map(messageKey => {
                                if(this.validationMessages[controlKey][messageKey]){
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + '<br />';
                                }
                            });
                        }
                    }
                }
            }
        }

        return messages;
    }
}

export interface DisplayMessage{
    [key: string]: string
}
export interface ValidationMessages{
    [key: string]: { [key: string] : string }
}