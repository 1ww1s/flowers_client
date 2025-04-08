import { fetchAuth } from "../../../app/api/fetch"




class RoleService {

    async getAll(): Promise<string[]> {
        const res = await fetchAuth(`${process.env.REACT_APP_SERVER_URL_API}/admin/role/getAll`)
        if(!res.ok){
            const {message}: {message: string} = await res.json()
            throw new Error(message)
        }
        const roles: string[] = await res.json()
        return roles
    }

}

export const roleService = new RoleService()