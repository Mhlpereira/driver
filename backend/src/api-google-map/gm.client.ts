import axios from "axios";
import { Location } from "../types";

export class GMClient{

    private readonly apiKey = process.env.GOOGLE_API_KEY;

    async fetchRoutes(origin: Location, destination: Location): Promise<any> {
        return axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', {
          origin,
          destination,
          key: this.apiKey,
        });
      }
}