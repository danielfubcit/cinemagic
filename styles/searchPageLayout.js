import React, { useEffect, useState, useRef } from 'react';
import scss from '@/styles/pageStyles/genreFiltered.module.scss';
import scss2 from '@/styles/pageStyles/genreFiltered.module.scss';
import { useTheme } from "@/utils/provider";
import { useRouter } from 'next/router';
import { filtering } from '@/utils/func';

import movies from '@/utils/imdbTop250.json';

// components
import Logo from '@/comps/Logo';
import SearchBar from '@/comps/SearchBar';
import NavBar from '@/comps/NavBar';
import GenreDropdownMenu from '@/comps/DropDownPicker/genre';
import YearDropdownMenu from '@/comps/DropDownPicker/year';
import DurationDropdownMenu from '@/comps/DropDownPicker/duration';
import DragIcons from '@/comps/DragIcon';
import Dropzone from '@/comps/Dropzone';
import PopUpCont from '@/comps/PopUpCont';
import GridCard from '@/comps/GridCard';
import PopUpFavCont from '@/comps/PopUpFavCont';
import TextUI from '@/comps/TextUI';

export default function PageLayout({ children }) {
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState(false);
  const [view, setView] = useState(false);
  const [setPop, setSetPop] = useState(false);
  const [dropzonePop, setDropzonePop] = useState(false);
  const [favPop, setFavPop] = useState(false);
  const [displayFav, setDisplayFav] = useState(false);
  
  const router = useRouter();

  const changeTheme = () => {
    setMode(!mode);
    setTheme(theme === 'light' ? 'default' : 'light')
    console.log("Theme", mode)
  }

  const changeView = () => {
    setView(!view);
    console.log("View", view)
  }

  const dropzone = () => {
    setDropzonePop(!dropzonePop);
  }

  const setting = () => {
    setSetPop(!setPop);
  }

  const favourite = () => {
    setFavPop(!favPop);
  }

  useEffect(() => {
    SearchCards();
  }, [])

  function SearchCards(val){
    console.log(val);
    var searchedVal = filtering(movies, {
      title: val
    })
    var slicedSearchArr = searchedVal.slice(0, 20);

    function sliceTitle(movie){
      if(movie.length < 14){
        return "";
      }else if(movie.length > 14 ){
        return "...";
      }
    }

    return (
      <div className={scss2.contentRow}>
        {slicedSearchArr.map(data => (
          <GridCard 
            movieName={data.Title.slice(0,14) + sliceTitle(data.Title)} 
            imageSrc={ data.Poster } 
            key={ data.Title } 
            onCardClick={ () => handleCardClick(`${data.Title}`)} 
          />
        ))}
      </div>
    )
  }

  const filteringMoviesByGenre = (genre) => {
    router.push(`/genre/${genre}`);
  }
  const filteringMoviesByYear = (year) => {
    router.push(`/year/${year}`);
  }  
  const filteringMoviesByDuration = (dur) => {
    var trimmedStr = dur.split(' ').join('');
    router.push(`/duration/${trimmedStr}`);
  }
  
  return (
    <div className={scss.windowCont}>
      <div className={scss.phoneSizeCont}>
        {/* cinemagic logo/title */}
        <div className={scss.titleCont}>
          <Logo />
        </div>

        {/* search bar */}
        <div className={scss.searchBarCont}>
          <SearchBar onChange={ (e) => SearchCards(e.target.value) }/>
        </div>

        {/* drop down filter menus */}
        <div className={scss.dropDownCont}>
          <GenreDropdownMenu onSelection={ sel => filteringMoviesByGenre(`${sel}`) } />
          <YearDropdownMenu onSelection={ sel => filteringMoviesByYear(`${sel}`) } />
          <DurationDropdownMenu onSelection={ sel => filteringMoviesByDuration(`${sel}`) } />
        </div>

              {/* subheading */}
      <div className={scss.trendingHeadingCont}>
        <TextUI Title="test" />
      </div>

      {/* filtered movies */}
      <div className={scss2.contentContainer}>
        <SearchCards />
      </div>  

        {/* Drag icon*/}
        <div>
          <DragIcons onClickDrag={dropzone}/>
        </div>

        {/* Dropzone pop up */}
        <Dropzone 
          display={dropzonePop === true ? "block" : "none"} 
        />

        {/* nav bar */}
        <div className={scss.navBarCont}>
          <NavBar 
          onClickSetting={setting} 
          onClickFav={favourite}
          onClickHome={ () => router.push('/') } 
          />
        </div>

        {/* Setting pop up */}
        <PopUpCont 
          darkLight={changeTheme} 
          gridList={changeView} 
          onPressCloseBtn={setting} 
          display={setPop === true ? "visible" : "hidden"} 
          position1={mode === true ? "0px" : "27px"} 
          position2={view === true ? "0px" : "27px"} 
        />

        {/* fav popup */}
        <PopUpFavCont
            display={favPop === true ? "visible" : "hidden"}
            onPressCloseBtn={favourite}
            cardDisplay={displayFav === true ? "block" : "none"}
          />
      </div>
    </div>
  )
}