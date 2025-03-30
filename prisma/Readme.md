Based on your Prisma schema, the **4 database tables** (`User`, `Post`, `PostLike`, `PostRetweet`) will look like this:

---

### **1️⃣ User Table (`User`)**
| id (PK)  | username (Unique) | password | profilePic | bio | email | gender | createdAt | updatedAt |
|----------|------------------|----------|------------|-----|-------|--------|-----------|-----------|
| `u1` | `john_doe` | `hashed_pw` | `pic.jpg` | `Hello!` | `john@example.com` | `male` | `2025-03-30` | `2025-03-30` |
| `u2` | `jane_doe` | `hashed_pw` | `null` | `Hi!` | `jane@example.com` | `female` | `2025-03-30` | `2025-03-30` |

✅ **Each User can create multiple Posts, Like Posts, and Retweet Posts.**

---

### **2️⃣ Post Table (`Post`)**
| id (PK)  | caption | image | likes | retweets | publicKey | postedBy (FK → User.id) |
|----------|---------|-------|-------|----------|-----------|------------------|
| `p1` | `"First Post"` | `img1.jpg` | `2` | `1` | `null` | `u1` |
| `p2` | `"Second Post"` | `null` | `1` | `0` | `null` | `u2` |

✅ **Each Post is created by a single User (`postedBy`).**  
✅ **Each Post can have many Likes & Retweets stored in `PostLike` & `PostRetweet`.**

---

### **3️⃣ PostLike Table (`PostLike`)**  
(*Stores which users liked which posts — Many-to-Many Relationship*)

| id (PK)  | userId (FK → User.id) | postId (FK → Post.id) |
|----------|------------------|------------------|
| `l1` | `u1` | `p1` | (*John liked Post 1*) |
| `l2` | `u2` | `p1` | (*Jane liked Post 1*) |
| `l3` | `u2` | `p2` | (*Jane liked Post 2*) |

✅ **Each row represents a user liking a post.**  
✅ **The `@@unique([userId, postId])` ensures no duplicate likes.**  

---

### **4️⃣ PostRetweet Table (`PostRetweet`)**  
(*Stores which users retweeted which posts — Many-to-Many Relationship*)

| id (PK)  | userId (FK → User.id) | postId (FK → Post.id) |
|----------|------------------|------------------|
| `r1` | `u1` | `p2` | (*John retweeted Post 2*) |
| `r2` | `u2` | `p1` | (*Jane retweeted Post 1*) |

✅ **Each row represents a user retweeting a post.**  
✅ **The `@@unique([userId, postId])` ensures no duplicate retweets.**

---

### **🔎 Relations Summary**
- **One-to-Many (`1:M`)**
  - `User (1) ───< Post (Many)`
- **Many-to-Many (`M:M`)**
  - `User (Many) ───< PostLike >─── Post (Many)`
  - `User (Many) ───< PostRetweet >─── Post (Many)`

---

🚀 **Would you like to add more features like Comments or Followers?** 😃