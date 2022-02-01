import {Controller, Query, Mutation} from "vesper";
import {EntityManager} from "typeorm";
import {Post} from "../entity/Post";

@Controller()
export class PostController {

    constructor(private entityManager: EntityManager) {
    }

    // serves "posts: [Post]" requests
    @Query()
    posts() {
        return this.entityManager.find(Post);
    }

    // serves "post(id: Int): Post" requests
    @Query()
    post({ id } : {id:number}) {
        return this.entityManager.findOne(Post, id);
    }

    // serves "postSave(id: Int, title: String, text: String): Post" requests
    @Mutation()
    postSave(args: any) {
        const post = this.entityManager.create(Post, args);
        return this.entityManager.save(Post, post);
    }

    // serves "postDelete(id: Int): Boolean" requests
    @Mutation()
    async postDelete({ id } : {id:number}) {
        const post = await this.entityManager.findOneOrFail(Post, id)
        await this.entityManager.remove(Post, [post]);
        return true;
    }

}