import { ExecError, MakeConfig } from '@/lib/api/axios';
import axios from 'axios';

export const authApi = {
	async login(data) {
		const url = `/auth/login`
		const config = MakeConfig(url, 'post', null, null, data)
		try {
			const rs = await axios.request(config)
			return rs.data
		} catch (e) {
			return ExecError(e.response ? e.response : null)
		}
	},
	async getMe(token) {
		const url = `/user/me`
		const config = MakeConfig(url, 'get', token)
		try {
			const rs = await axios.request(config)
			return rs.data
		} catch (e) {
			return ExecError(e.response ? e.response : null)
		}
	},
	async changePass(token, data) {
		const url = `/user/change-password`
		const config = MakeConfig(url, 'post', token, null, data)
		try {
			const rs = await axios.request(config)
			return rs.data
		} catch (e) {
			return ExecError(e.response ? e.response : null)
		}
	},
	async forgotPass(data) {
		const url = `/auth/forgot-password`
		const config = MakeConfig(url, 'post', null, null, data)
		try {
			const rs = await axios.request(config)
			return rs.data
		} catch (e) {
			return ExecError(e.response ? e.response : null)
		}
	},
	async resetPass(data) {
		const url = `/auth/reset-password`
		const config = MakeConfig(url, 'post', null, null, data)
		try {
			const rs = await axios.request(config)
			return rs.data
		} catch (e) {
			return ExecError(e.response ? e.response : null)
		}
	}
}