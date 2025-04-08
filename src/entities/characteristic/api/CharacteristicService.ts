import { fetchAuth } from "../../../app/api/fetch"



class CharacteristicService{

    controller: AbortController | null

    constructor(){
        this.controller = null
    }

    setController(){
        const controller = new AbortController()
        this.controller = controller
    }

    async getCharacteristicsValuesStartsWith(value: string, characteristicName: string): Promise<string[]> {
        if(!value.length){
            if(this.controller)
                this.controller.abort()
            return []
        }   
        if(this.controller){
            this.controller.abort()
        }
        const controller = new AbortController()
        this.controller = controller
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/getValuesStartsWith`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            signal: this.controller.signal,
            body: JSON.stringify({value, characteristicName})
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const values: string[] = await res.json()
        this.controller = null;
        return values
    }

    async getCharacteristics() {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/getAll`)
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const values: string[] = await res.json()
        return values
    }

}


export const characteristicService = new CharacteristicService()