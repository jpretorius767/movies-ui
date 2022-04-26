
<template>
    <div class="card">

     <DataView :value="movies" :layout="layout" :paginator="true" :lazy="true" :rows="20">
     <template #empty>No records found.</template>
      <template #header>
                  <div class="grid grid-nogutter">
                      <div class="col-6" style="text-align: right">
                   
                          <DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
                      </div>
                  </div>
      </template>
       <template #list="slotProps">

				<div class="col-12">
					<div class="movie-list-item">
						<img :src="slotProps.data.posterurl" :alt="slotProps.data.title"/>
						<div class="movie-list-detail">
							<div class="movie-name">{{slotProps.data.title}} <span>({{slotProps.data.year}})</span></div>
							<div class="movie-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.imdbRating || 0" :readonly="true" :cancel="false"></Rating>
							<i class="pi pi-tag movie-genres-icon"></i><span class="movie-genres">{{slotProps.data.genres.join('|')}}</span>
						</div>
					</div>
				</div>
   
			</template>
     </DataView>
      
	</div>
</template>

<script>
import { MovieService } from '@/services';

export default {
  name: 'HomeView',
    data() {
        return {
            movies: null,
            layout: 'list',
            sortKey: null,
            sortOrder: null,
            sortField: null
        }
    },
    movieService: null,
    created() {
        this.movieService = new MovieService();
    },
    async mounted() {
        const data = await this.movieService.getMovies(); //.then(data => this.movies = data);
        this.movies = data;
        // this.layout = 'grid';
    },
    methods: {
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.movie-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.movie-description {
	margin: 0 0 1rem 0;
}

.movie-genres-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.movie-genres {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.movie-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.movie-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	// .movie-price {
	// 	font-size: 1.5rem;
	// 	font-weight: 600;
	// 	margin-bottom: .5rem;
	// 	align-self: flex-end;
	// }

	.movie-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.movie-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.movie-grid-item-top,
	.movie-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.movie-grid-item-content {
		text-align: center;
	}

// 	.movie-price {
// 		font-size: 1.5rem;
// 		font-weight: 600;
// 	}
}

@media screen and (max-width: 576px) {
	.movie-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.movie-list-detail {
			text-align: center;
		}

		.movie-price {
			align-self: center;
		}

		.movie-list-action {
			display: flex;
			flex-direction: column;
		}

		.movie-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>
