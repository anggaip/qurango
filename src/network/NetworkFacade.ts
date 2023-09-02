import axios from 'axios'

class NetworkFacade {
  static get(url: string) {
    return axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
    .then(response => {
      return response
    })
  }
}

export default NetworkFacade