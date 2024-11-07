import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
    stable var posts : [Post] = [];

    public type Post = {
        author: Text;
        title: Text;
        body: Text;
    };

    public func addPost(author: Text, title: Text, body: Text) : async () {
        let newPost : Post = {
            author = author;
            title = title;
            body = body;
        };
        posts := Array.append(posts, [newPost]);
    };

    public query func getPosts() : async [Post] {
        return posts;
    };
}
