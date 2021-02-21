import API from '@aws-amplify/api';

const api = () => {
  const apiName = 'activityStore';

  return {
    get: (path: string) => API.get(apiName, path, {}),
    put: (path: string, body: any) => API.put(apiName, path, {
      body
    }),
    post: (path: string, body: any) => API.post(apiName, path, {
      body
    })
  }
}

export default api();