
export default class MovieService {


	public getMovies(): Promise<Response> {
		return fetch('http://localhost:3000/get_movies.php').then(res => res.json()).then(d => d);
    }

}
    