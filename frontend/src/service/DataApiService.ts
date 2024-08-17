import http from "@/service/httpclient";

const APPLICATION_JSON : string = "application/json";

class DataApiService {
  getAll(): Promise<any> {
    return http.get("/api/item");
  }

  create(name: string, price: number): Promise<any> {
    return http.post(
        `/api/item`, 
        { 
            name: `${name}`,
            price: `${price}`
        }
    );
  }

  update(id: number, name: string, price: number): Promise<any> {
    return http.put(
        `/api/item/${id}`,
        { 
            name: `${name}`,
            price: `${price}`
        }
    );
  }

  delete(id: number): Promise<any> {
    return http.delete(`/api/item/${id}`);
  }
}

export default new DataApiService();
