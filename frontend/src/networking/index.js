import bookNetworking from "./book";
import fileNetworking from "./file";
import authNetworking from "./auth";

export default {
  ...bookNetworking,
  ...fileNetworking, 
  ...authNetworking,
}