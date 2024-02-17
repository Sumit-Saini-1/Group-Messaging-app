import { useEffect, useState } from "react";
import Style from "./style.module.css";
import { TrendingGroupApi } from "../../../ReuestsToServer/Group";
import { GetTrendingRegion, GetTrendingUser } from "../../../ReuestsToServer/User";


export default function Dashboard() {
    const [trendingGroups, setTrendingGroups] = useState([]);
    const [trendingRegions, setTrendingRegions] = useState([]);
    const [trendingUsers, setTrendingUsers] = useState([]);

    useEffect(function () {
        TrendingGroupApi().then(groups => {
            setTrendingGroups(groups);
        }).catch(err => {
            console.log(err.message);
            setTrendingGroups([]);
        });

        GetTrendingRegion().then(regions=>{
            setTrendingRegions(regions);
        }).catch(err=>{
            console.log(err.message);
            setTrendingRegions([]);
        });

        GetTrendingUser().then(users=>{
            setTrendingUsers(users);
        }).catch(err=>{
            console.log(err.message);
            setTrendingUsers([]);
        });
    },[]);

    return (
        <div className={Style.container}>
            <div className={Style.head}>Dashboard</div>
            <div className={Style.analytics}>
                <div className={Style.analC}>
                    <div className={Style.colHead}>Top 5 trending Groups</div>
                    <ul className={Style.Glist}>
                        {
                            trendingGroups.length==0?
                            <div>no group available</div>
                            :trendingGroups.map((value, index) => {
                                return (
                                    <li key={index}><span>{value.groupname}</span><span>{value.postCount}</span></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={Style.analC}>
                    <div className={Style.colHead}>Top 5 trending regions</div>
                    <ul className={Style.list}>
                        {
                            trendingRegions.length==0?
                            <div>No region available</div>
                            :trendingRegions.map((value, index) => {
                                return (
                                    <li key={index}>{value.region}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={Style.analC}>
                    <div className={Style.colHead}>Top 5 trending users</div>
                    <ul className={Style.list}>
                        {
                            trendingUsers.length==0?
                            <div>No user available</div>
                            :trendingUsers.map((value, index) => {
                                return (
                                    <li key={index}>{value.username}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

Dashboard.defaultProps = {
    //
}

Dashboard.propTypes = {
    //
}