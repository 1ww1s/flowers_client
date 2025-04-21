import { fetchAuth } from "../../../app/api/fetch"
import { ICharacteristic } from "../model/types"



class CharacteristicService{

    controller: AbortController | null

    constructor(){
        this.controller = null
    }

    setController(){
        const controller = new AbortController()
        this.controller = controller
    }

    async create(characteristic: ICharacteristic){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/create`, {
            method: 'POST',
            body: JSON.stringify(characteristic)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
        
    async update(characteristic: ICharacteristic){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/update`, {
            method: 'POST',
            body: JSON.stringify(characteristic)
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
    }    
        
    async delete(id: number){
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/delete`, {
            method: 'POST',
            body: JSON.stringify({id})
        })
        const {message}: {message: string} = await res.json()
        if(!res.ok) {
            throw new Error(message)
        }
        return message
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

    async getStartsWith(name: string){
        if(!name.length){
            if(this.controller)
                this.controller.abort()
            return []
        }   
        if(this.controller){
            this.controller.abort()
        }
        this.controller = new AbortController()
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/characteristic/getStartsWith`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name}),
            signal: this.controller.signal
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const names: string[] = await res.json()
        this.controller = null;
        return names
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

    async get(name: string){
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL_API}/site/characteristic/get`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name}),
        })
        if(!res.ok) {
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const characteristic: ICharacteristic = await res.json()
        return characteristic
    }
}


export const characteristicService = new CharacteristicService()