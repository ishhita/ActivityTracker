import API from '@aws-amplify/api';

const api = () => {
  const apiName = 'activityStore';

  return {
    get: (path: string, body?: any) => {
      if (!body) return API.get(apiName, path, {});
      return API.get(apiName, path, {body});
    },
    put: (path: string, body: any) =>
      API.put(apiName, path, {
        body,
      }),
    post: (path: string, body: any) =>
      API.post(apiName, path, {
        body,
      }),
  };
};

export default api();
