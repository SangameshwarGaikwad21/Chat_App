import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft,Clock,MessageCircleMore,UserRound,ShieldCheck,} from "lucide-react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../redux/auth/auth.slice";

export default function Profile() {

    const dispatch = useDispatch();

    const { user, loading } = useSelector(
        (state) => state.auth
    );


    // ================= GET PROFILE =================

    useEffect(() => {

        dispatch(getUserProfile());

    }, [dispatch]);


    // ================= LOADING =================

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020617]">

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                    className="flex flex-col items-center"
                >

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            h-10
                            w-10
                            rounded-full
                            border-2
                            border-slate-800
                            border-t-cyan-400
                        "
                    />

                    <motion.p
                        animate={{
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                        }}
                        className="
                            mt-4
                            text-sm
                            text-slate-500
                        "
                    >
                        Loading profile...
                    </motion.p>

                </motion.div>

            </div>
        );
    }


    // ================= USER NOT FOUND =================

    if (!user) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020617] px-5">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                        w-full
                        max-w-md
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900/70
                        p-8
                        text-center
                        shadow-2xl
                    "
                >

                    <div className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-red-500/10
                        text-red-400
                    ">
                        <UserRound size={25} />
                    </div>

                    <h1 className="
                        mt-5
                        text-xl
                        font-semibold
                        text-white
                    ">
                        User not found
                    </h1>

                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">
                        We couldn't load your profile.
                    </p>

                    <Link
                        to="/chat"
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-cyan-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-cyan-500
                        "
                    >
                        <ArrowLeft size={16} />
                        Back to Chat
                    </Link>

                </motion.div>

            </div>
        );
    }


    return (

        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#020617]
                text-white
            "
        >

            {/* ================================================= */}
            {/* BACKGROUND */}
            {/* ================================================= */}

            <div className="
                pointer-events-none
                fixed
                inset-0
                overflow-hidden
            ">

                {/* Cyan glow */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.2,
                    }}
                    className="
                        absolute
                        -left-40
                        -top-40
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-cyan-500/10
                        blur-[100px]
                    "
                />


                {/* Blue glow */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.2,
                        delay: 0.2,
                    }}
                    className="
                        absolute
                        -bottom-40
                        -right-40
                        h-[450px]
                        w-[450px]
                        rounded-full
                        bg-blue-600/10
                        blur-[110px]
                    "
                />


                {/* Center glow */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/4
                        h-[300px]
                        w-[300px]
                        -translate-x-1/2
                        rounded-full
                        bg-indigo-500/5
                        blur-[100px]
                    "
                />


                {/* Grid pattern */}

                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:linear-gradient(rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.3)_1px,transparent_1px)]
                        [background-size:40px_40px]
                    "
                />

            </div>


            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <div className="
                relative
                z-10
                mx-auto
                w-full
                max-w-5xl
                px-4
                py-5
                sm:px-6
                sm:py-8
                lg:px-8
            ">


                {/* ================================================= */}
                {/* TOP NAVIGATION */}
                {/* ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >

                    {/* Back button */}

                    <Link
                        to="/chat"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-800
                            bg-slate-900/70
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-slate-400
                            backdrop-blur-xl
                            transition-all
                            duration-200
                            hover:border-cyan-500/30
                            hover:bg-cyan-500/10
                            hover:text-cyan-400
                        "
                    >

                        <ArrowLeft
                            size={17}
                            className="
                                transition-transform
                                duration-200
                                group-hover:-translate-x-1
                            "
                        />

                        <span>
                            Back to Chat
                        </span>

                    </Link>


                    {/* Profile status */}

                    <div className="
                        hidden
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-slate-800
                        bg-slate-900/60
                        px-3
                        py-1.5
                        text-xs
                        text-slate-500
                        backdrop-blur-xl
                        sm:flex
                    ">

                        <motion.span
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-emerald-400
                                shadow-lg
                                shadow-emerald-400/50
                            "
                        />

                        Profile

                    </div>

                </motion.div>


                {/* ================================================= */}
                {/* PROFILE CARD */}
                {/* ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                        scale: 0.97,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 18,
                    }}
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-3xl
                        border
                        border-slate-800/80
                        bg-slate-900/70
                        shadow-2xl
                        shadow-black/30
                        backdrop-blur-2xl
                    "
                >

                    {/* Card top glow */}

                    <div className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-0
                        h-52
                        w-[500px]
                        -translate-x-1/2
                        rounded-full
                        bg-cyan-500/10
                        blur-[100px]
                    " />


                    {/* ================================================= */}
                    {/* PROFILE HEADER */}
                    {/* ================================================= */}

                    <div className="
                        relative
                        border-b
                        border-slate-800/80
                        px-5
                        pb-9
                        pt-10
                        sm:px-10
                        sm:pt-12
                    ">

                        <div className="flex flex-col items-center">

                            {/* Avatar */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.15,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 150,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                }}
                                className="relative"
                            >

                                {/* Avatar glow */}

                                <div className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-cyan-500/20
                                    blur-2xl
                                " />


                                <img
                                    src={
                                        user.avatar ||
                                        "/avatar.png"
                                    }
                                    alt={
                                        user.username ||
                                        "User"
                                    }
                                    className="
                                        relative
                                        h-28
                                        w-28
                                        rounded-full
                                        border-4
                                        border-slate-800
                                        object-cover
                                        shadow-2xl
                                        shadow-cyan-500/10
                                        sm:h-36
                                        sm:w-36
                                    "
                                />


                                {/* Online indicator */}

                                <motion.span
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        delay: 0.5,
                                        type: "spring",
                                    }}
                                    className="
                                        absolute
                                        bottom-1
                                        right-1
                                        h-5
                                        w-5
                                        rounded-full
                                        border-4
                                        border-slate-900
                                        bg-emerald-500
                                        shadow-lg
                                        shadow-emerald-500/40
                                        sm:bottom-2
                                        sm:right-2
                                    "
                                />

                            </motion.div>


                            {/* Username */}

                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.3,
                                }}
                                className="
                                    mt-5
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    sm:text-3xl
                                "
                            >
                                {user.username}
                            </motion.h1>


                            {/* Email */}

                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: 0.4,
                                }}
                                className="
                                    mt-1
                                    max-w-full
                                    truncate
                                    px-5
                                    text-sm
                                    text-slate-500
                                "
                            >
                                {user.email}
                            </motion.p>


                            {/* Role */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    delay: 0.5,
                                }}
                                className="
                                    mt-4
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-cyan-500/20
                                    bg-cyan-500/10
                                    px-4
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-cyan-400
                                "
                            >

                                <span className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-cyan-400
                                " />

                                {user.role || "User"}

                            </motion.div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* INFORMATION CARDS */}
                    {/* ================================================= */}

                    <div className="
                        grid
                        grid-cols-1
                        items-stretch
                        gap-4
                        p-5
                        sm:grid-cols-2
                        sm:p-8
                    ">


                        {/* ================= BIO ================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.45,
                            }}
                            whileHover={{
                                y: -4,
                            }}
                            className="
                                flex
                                h-full
                                flex-col
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-950/50
                                p-5
                                transition-all
                                duration-300
                                hover:border-cyan-500/30
                                hover:bg-slate-900/70
                                hover:shadow-xl
                                hover:shadow-cyan-500/5
                            "
                        >

                            {/* Card heading */}

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    flex-shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-cyan-500/10
                                    text-cyan-400
                                ">
                                    <MessageCircleMore
                                        size={19}
                                    />
                                </div>


                                <div>

                                    <p className="
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-slate-600
                                    ">
                                        About
                                    </p>

                                    <h2 className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        Bio
                                    </h2>

                                </div>

                            </div>


                            {/* Bio text */}

                            <p className="
                                mt-5
                                flex-1
                                text-sm
                                leading-6
                                text-slate-400
                            ">
                                {user.bio ||
                                    "No bio added yet."}
                            </p>

                        </motion.div>


                        {/* ================= LAST SEEN ================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.55,
                            }}
                            whileHover={{
                                y: -4,
                            }}
                            className="
                                flex
                                h-full
                                flex-col
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-950/50
                                p-5
                                transition-all
                                duration-300
                                hover:border-blue-500/30
                                hover:bg-slate-900/70
                                hover:shadow-xl
                                hover:shadow-blue-500/5
                            "
                        >

                            {/* Card heading */}

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    flex-shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-500/10
                                    text-blue-400
                                ">
                                    <Clock
                                        size={19}
                                    />
                                </div>


                                <div>

                                    <p className="
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-slate-600
                                    ">
                                        Activity
                                    </p>

                                    <h2 className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    ">
                                        Last Seen
                                    </h2>

                                </div>

                            </div>


                            {/* Last seen */}

                            <p className="
                                mt-5
                                flex-1
                                text-sm
                                leading-6
                                text-slate-400
                            ">
                                {user.lastSeen
                                    ? new Date(
                                        user.lastSeen
                                    ).toLocaleString()
                                    : "Not available"}
                            </p>

                        </motion.div>

                    </div>


                    {/* ================================================= */}
                    {/* ACTIONS */}
                    {/* ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.65,
                        }}
                        className="
                            flex
                            flex-col
                            gap-3
                            border-t
                            border-slate-800/80
                            p-5
                            sm:flex-row
                            sm:justify-center
                            sm:p-8
                        "
                    >

                        {/* Edit Profile */}

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-blue-600
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-cyan-500/10
                                transition-all
                                duration-200
                                hover:from-cyan-400
                                hover:to-blue-500
                                hover:shadow-cyan-500/20
                            "
                        >
                            <UserRound size={16} />
                            
                            <Link to="/edit-profile">
                                Edit Profile
                            </Link>

                            
                        </motion.button>


                        {/* Go To Chat */}

                        <motion.div
                            whileHover={{
                                scale: 1.02,
                                y: -1,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                        >
                            <Link
                                to="/chat"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-800/70
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-200
                                    transition-all
                                    duration-200
                                    hover:border-slate-600
                                    hover:bg-slate-800
                                "
                            >
                                <MessageCircleMore
                                    size={16}
                                />

                                Go to Chat
                            </Link>
                        </motion.div>

                    </motion.div>

                </motion.div>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.9,
                    }}
                    className="
                        mt-6
                        pb-4
                        text-center
                        text-[11px]
                        text-slate-700
                    "
                >
                    ChatSphere · Your conversations, your space.
                </motion.p>

            </div>

        </motion.div>
    );
}