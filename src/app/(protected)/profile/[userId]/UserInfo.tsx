import React from 'react'
import { UserType } from './page'
import Image from 'next/image'
import EditProfileButton from '@/components/profile/editProfileButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

async function UserInfo({ user }: { user: UserType }) {
    const session = await getServerSession(authOptions);
    return (
        <div className='min-h-screen pt-[20vh] bg-blue-200 dark:bg-stone-700'>
            <div className='flex items-center justify-around'>
                <section className='h-full flex flex-col gap-5 justify-center items-center'>
                    <Image
                        src={user.profilePic}
                        alt={user.username}
                        height={150}
                        width={150}
                    />
                    {user.id === session?.user.id &&
                        <EditProfileButton />
                    }
                    <div className='flex flex-col gap-3 items-center justify-around'>
                        <div className='flex flex-col gap-2 items-center'>
                            <span className='text-3xl'>{user.username}</span>
                            <span className='text-lg'>{user.bio ? user.bio : <span className='text-slate-500'>No bio yet ˙◠˙ </span>}</span>
                        </div>
                        <div className='flex items-center gap-5 text-xl'>
                            <span>{user.posts.length} posts</span>
                            <span>{user.retweetedPosts.length} retweets</span>
                        </div>
                    </div>
                </section>
                <section className='h-[75vh]'>

                </section>
                <section>

                </section>
            </div>
        </div>
    )
}

export default UserInfo
