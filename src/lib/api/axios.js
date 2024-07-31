// import {signOut} from 'next-auth/react';


export const MakeConfig = (url, method, token, headers, data) => {
  const config = {
    method,
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_KEY}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    params: {}
  }
  if (token) config.headers.authorization = `Bearer ${token}`
  if (headers) config.headers = headers
  if (method.toLowerCase() !== 'get' && data) config.data = JSON.stringify(data)
  return config
}

export const ExecError = res => {
  if (res.data && res.data.httpCode && res.data.httpCode === 401 && res.data.errors && res.data.errors.toLowerCase() === 'invalid token or token expired') {
    return signOut({ callbackUrl: '/' }).then()
  }
  return {
    code: res && res.status ? res.status : 500,
    message: res && res.data && res.data.detail ? res.data.detail : 'Unknown error',
    errorCode: res && res.data && res.data.errorCode ? res.data.errorCode : 'Unknown error code',
  }
}
export const MakeStrapiConfig = (url, method, token, headers, data) => {
  const config = {
    method,
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
  }
  if (token) config.headers.authorization = `Bearer ${token}`
  if (headers) config.headers = headers
  if (method.toLowerCase() !== 'get' && data) config.data = JSON.stringify(data)
  return config
}

