// This file solves a sudoku array and returns the solved sudoku array (or, arrays)
// Note: Due to the author's familiarity with MATLAB, the algorithms herein were first computed there and will be translated into JavScript in the coming days

function initializeAllOptions (sudokuBoard)
  {
    //Initializes an array that fully captures all possible options for the initial configuration of the Sudoku board from the input sudokuBoard array
    var sudokuBoardAll = [];
    for (var i=0;i<9;i++)
    {
      var thiszFillArr=[0,0,0,0,0,0,0,0,0];
      sudokuBoardAll.push(thiszFillArr);
    }

    //Order 3x3 boxes by most filled values
    var BoxFilledPos=[];

    // console.log('Works so far');
    for (var i=0;i<9;i++)
    {
        //Get subBox i from sudokuBoard
        var subBox=[];
        var boxUsedValues=[];
        var numbers1to9=[1,2,3,4,5,6,7,8,9];
        var correspondingRows=[3*(Math.floor(i/3)), 1+3*(Math.floor(i/3)), 2+3*(Math.floor(i/3))];
        var correspondingCols=[3*(i-3*Math.floor((i)/3)), 1+3*(i-3*Math.floor((i)/3)), 2+3*(i-3*Math.floor((i)/3))];
        for (var j=3*(Math.floor(i/3)); j<3+3*(Math.floor(i/3));j++)
        {
            var tempsBArr=[];
            for (var k=3*(i-3*Math.floor((i)/3));k<3+3*(i-3*Math.floor(i/3));k++)
            {
                if (sudokuBoard[j][k]!==0)
                {
                    tempsBArr.push(sudokuBoard[j][k]);
                    BoxFilledPos=BoxFilledPos+1;
                    boxUsedValues.push(sudokuBoard[j][k]);
                }
                else
                {
                  tempsBArr.push(0);
                }
            
            
            }
            subBox.push(tempsBArr);
        }
    
      var numsLeftToPick=setdiff(numbers1to9,boxUsedValues);
      
      for (var j=0;j<3;j++)
      {
        for (var k=0;k<3;k++)
        {
          if (subBox[j][k]==0)
          {
            sudokuBoardAll[correspondingRows[j]][correspondingCols[k]]=parseInt(intersect(intersect(setdiff(numbers1to9,sudokuBoard[correspondingRows[j]]),setdiff(numbers1to9,getCol(sudokuBoard,correspondingCols[k]))),numsLeftToPick).join(""));
          }
          else
          {
            sudokuBoardAll[correspondingRows[j]][correspondingCols[k]]=subBox[j][k];
          }
          
          
        }
      }
    }


    return sudokuBoardAll;
  }

  function sBATrySolver (sudokuBoardAll)
  {
      //Computes and returns four variables 
      //rowSolved - A vector with a boolean for each row describing whether the row contains only the integers from 1-9, once each
      //colSolved - A vector with a boolean for each column describing whether the column contains only the integers from 1-9, once each
      //boxSolved - A vector with a boolean for each subBox describing whether the subBox contains only the integers from 1-9, once each. subBoxes are counted in row-major order (e.g. right then down)
      //sudokuBoardAll - An array of integers (that may have entries greater than 9), holding the remaining possible configurations after trying the first-pass solver on the initial (input) sudokuBoardAll
      
      var numLoops=0;
      var numLoopsWithoutChange=0;
      var maxAllowedNumLoopsWithoutChange=10;
      var rowSolved=[0,0,0,0,0,0,0,0,0];
      var colSolved=[0,0,0,0,0,0,0,0,0];
      var boxSolved=[0,0,0,0,0,0,0,0,0];
      var currentMax=100;
      var numbers1to9=[1,2,3,4,5,6,7,8,9];
      while (currentMax>9)
      {
        var sudokuBoardAllOld=[];
        for (var i=0;i<9;i++)
        {
          sudokuBoardAllOld.push(sudokuBoardAll[i]);
        }

        //Row-Wise Simplification
        for (var i=0;i<9;i++)
        {
          console.log(i);
          var RowTakens=setdiff(numbers1to9,setdiff(numbers1to9,sudokuBoardAll[i]));
          console.log(RowTakens);
          //Remove from possibles in each Row
          //  If only two 2-values in the col, remove both values from other
          //  locations in col
          var found2Values=[];
          var indicesGreaterThan9=[];
          for (var j=0;j<9;j++)
          {
            if (sudokuBoardAll[i][j]>9)
            {

              indicesGreaterThan9.push(j);
              if (sudokuBoardAll[i][j]<100)
              {
                found2Values.push(j);
              }
            }
          }
          // console.log(found2Values);
          // console.log(sudokuBoardAll[i].find(element => element>9 & element<100));
          var found2ValuesRemoveFromPermissiveIndices=[];
          var found2ValuesTable=[];
          var found2ValuesTableVals=[];
          var found2ValuesTableValsCount=[];
          if (found2Values!==undefined)
          {
            console.log('b');
            console.log(found2Values);
            console.log(found2Values.length);
            for (var j=0;j<found2Values.length;j++)
            {
              if (!found2ValuesTableVals.includes(sudokuBoardAll[i][found2Values[j]]))
              {
                console.log(j); 
                console.log(sudokuBoardAll[i][found2Values[j]]);  
                console.log(sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length);
                found2ValuesTable.push([sudokuBoardAll[i][found2Values[j]],sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length]);
                found2ValuesTableVals.push(sudokuBoardAll[i][found2Values[j]]);
                found2ValuesTableValsCount.push(sudokuBoardAll[i].filter(element => element===sudokuBoardAll[i][found2Values[j]]).length);
              }
              
            }
            console.log(found2ValuesTable);
            console.log('e');
            var found2ValuesTable2PresentFind=[];
            var found2ValuesTable2PresentVals=[];
            var found2ValuesTable2PresentValsCount=[];
            for (var j=0;j<found2ValuesTableValsCount.length;j++)
            {
              if (found2ValuesTableValsCount[j]===2)
              {
                found2ValuesTable2PresentFind.push(j);
                found2ValuesTable2PresentVals.push(found2ValuesTableVals[j]);
                found2ValuesTable2PresentValsCount.push(found2ValuesTableValsCount[j]);
              }
              
            }
            console.log('found2ValuesTable2PresentFind: ');
            console.log(found2ValuesTable2PresentFind);


            if (found2ValuesTable2PresentVals!==undefined)
            {
              for (var f2vi=0;f2vi<found2ValuesTable2PresentVals.length;f2vi++)
              {
                var thisPermissiveString=found2ValuesTable2PresentVals.join("");
                console.log('thisPermissiveString: ')
                console.log(thisPermissiveString);
                RowTakens.push(parseInt(thisPermissiveString[0])); RowTakens.push(parseInt(thisPermissiveString[1])); 
                for (var j=0; j<9;j++)
                {
                  if(sudokuBoardAll[i][j]===found2ValuesTable2PresentVals[f2vi])
                  {
                    found2ValuesRemoveFromPermissiveIndices.push(j);
                  }
                }
                // found2ValuesRemoveFromPermissiveIndices.push(sudokuBoardAll[i].findIndex(element => element===found2ValuesTable2PresentVals[f2vi]));
              }
            }
            
            // for f2vi=1:length(found2ValuesTable2Present(:,1))
            //         thisPermissiveString=num2str(found2ValuesTable2Present(f2vi,1));
            //         RowTakens=[RowTakens str2num(thisPermissiveString(1)) str2num(thisPermissiveString(2))];
            //         found2ValuesRemoveFromPermissiveIndices=[found2ValuesRemoveFromPermissiveIndices reshape(find(sudokuBoardAll(i,:)==found2ValuesTable2Present(f2vi,1)),1,[])];
            // end
          }
          
          // debugger;
          console.log(found2ValuesRemoveFromPermissiveIndices);
          var RowPermissiveIndices=setdiff(indicesGreaterThan9,found2ValuesRemoveFromPermissiveIndices);

          //If there is a number that has yet to appear yet only shows up once in a row, column, or box, then by necessity the value containing that number must be set to that number
          var individualNumberAppearances=[];
          for (var j=0;j<RowPermissiveIndices.length;j++)
          {
            individualNumberAppearances.push([0,0,0,0,0,0,0,0,0]);
          }
          for (var iNA=0;iNA<RowPermissiveIndices.length;iNA++)
          {
            var thisPermissiveString=sudokuBoardAll[i][RowPermissiveIndices[iNA]].join("");
            for (var iNAk=0;iNAk<thisPermissiveString.length;iNAk++)
            {
              individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])]=individualNumberAppearances[iNA][parseInt(thisPermissiveString[iNAk])]+1;
              
            }
          }
          var individualNumberAppearancesSum=[];
          var individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues=[];
          for (var lmo=0;lmo<9;lmo++)
          {
            individualNumberAppearancesSum[lmo]=sumArray(getCol(individualNumberAppearances,lmo));
            if (individualNumberAppearancesSum[lmo]==1)
            {
              individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues.push(individualNumberAppearancesSum[lmo]);
            }
            
          }
          var individualNumberAppearancesSumOnlyAppearedOnce=setdiff(individualNumberAppearancesSumOnlyAppearedOnceButPossiblyIncludeRowTakenValues,RowTakens);
          if (individualNumberAppearancesSumOnlyAppearedOnce!==undefined)
          {
            var RPIToRemove=[];
            for (var iNASOAO=0;iNASOAO<individualNumberAppearancesSumOnlyAppearedOnce.length;iNASOAO++)
            {
              RowTakens.push(individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO]);
              //Note to self: Should be able to use findIndex(), because there should be only one(?)
              RPIToRemove.push(RowPermissiveIndices[getCol(individualNumberAppearancesSumOnlyAppearedOnce,iNASOAO).findIndex(element => element===1)]);
              sudokuBoardAll[i,RPIToRemove[RPIToRemove.length-1]]=individualNumberAppearancesSumOnlyAppearedOnce[iNASOAO];
            }
            
          }

          for (var j=0;j<RowPermissiveIndices.length;j++)
          {
            var tempStr="";
            var thisPermissiveString=sudokuBoardAll[i][RowPermissiveIndices[j]].join("");
            for (var k=0;k<thisPermissiveString.length;k++)
            {
              if (!RowTakens.includes(parseInt(thisPermissiveString[k])))
              {
                tempStr=tempStr+thisPermissiveString[k];
              }
            }
            sudokuBoardAll[i][RowPermissiveIndices[j]]=parseInt(tempStr);
          }

          //JavaScript does not have a built-in sort method like MATLAB does, so....gonna try toString comparison :|
          for (setdiff(numbers1to9,sudokuBoardAll[i])===undefined && sudokuBoardAll[i].sort(compareNumbers).toString()==numbers1to9.sort(compareNumbers).toString())
          {
            rowSolved[i]=1;
          }

          // if isempty(setdiff(1:9,sudokuBoardAll(i,:))) && sum(reshape(sort(sudokuBoardAll(i,:)),1,[])-(1:9))==0
          //       rowSolved(i)=1;
          //   end

          // for j=1:length(RowPermissiveIndices)
          //       tempStr="";
          //       thisPermissiveString=num2str(sudokuBoardAll(i,RowPermissiveIndices(j)));
          //       for k=1:length(thisPermissiveString)
          //           if ~ismember(RowTakens,str2num(thisPermissiveString(k)))
          //               tempStr=tempStr+thisPermissiveString(k);
          //           end
          //       end
          //       sudokuBoardAll(i,RowPermissiveIndices(j))=str2num(tempStr);
          //   end

          // if ~isempty(individualNumberAppearancesSumOnlyAppearedOnce)
          //       RPIToRemove=[];
          //       for iNASOAO=1:length(individualNumberAppearancesSumOnlyAppearedOnce)
          //           RowTakens=[RowTakens individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO)];
          //           RPIToRemove=[RPIToRemove RowPermissiveIndices(find(individualNumberAppearances(:,individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO))==1))];
          //           sudokuBoardAll(i,RPIToRemove(end))=individualNumberAppearancesSumOnlyAppearedOnce(iNASOAO);
          //       end
          //       RowPermissiveIndices=setdiff(RowPermissiveIndices,RPIToRemove);
          //   end
          
          // for iNA=1:length(RowPermissiveIndices)
          //     thisPermissiveString=num2str(sudokuBoardAll(i,RowPermissiveIndices(iNA)));
          //       for iNAk=1:length(thisPermissiveString)
          //           individualNumberAppearances(iNA,str2num(thisPermissiveString(iNAk)))=individualNumberAppearances(iNA,str2num(thisPermissiveString(iNAk)))+1;
          //       end
          //   end
        }
        
        //Column-Wise Simplification
        for (var i=0;i<9;i++)
        {

        }

        //Box-Wise Simplification
        for (var i=0;i<9;i++)
        {
          
        }
        currentMax=5;
      }

      // return null;
      return rowSolved,colSolved,boxSolved,sudokuBoardAll;
  }

function testIsSolution(rowSolved,colSolved,boxSolved,sudokuBoardAll)
{
    //Computes and returns the boolean variable boardSolved
    //If each row is solved, and each column is solved, and each subBox is solved, then the board is solved!
    //Otherwise, board not solved. :(

    return boardSolved;
}

function hailMaryUnsolvedBoards(boardSolved,sudokuBoardAll)
{
    //Computes and returns three variables
    //storeBoards - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to an initially unsolved configuration of the initial input baord
    //storeBoardsSolvedMaybe - An Object containing potentially multiple nested arrays, with the terminal node on each branch corresponding to either a solved or unsolved configuration of the initial input baord, corresponding to the second-pass solver applied to the corresponding entry in storeBoards
    //storeBoardsSolvedVars - An Object containing potentially multiple nested vectors, with the terminal node on each branch corresponding to a boolean, indicating whether the corresponding entry of storeBoardsSolvedMaybe is solved (the terminal node has a value of 1), or unsolved (the terminal node has a value of 0)

    return storeBoards,storeBoardsSolvedMaybe,storeBoardsSolvedVars;
}

//The commented code below is the flow of calls to the functions above copied from my MATLAB script, and will be translated subsequently to completion of the functions
// sudokuBoardAll = initializeAllOptions(sudokuBoard);
         
// sudokuBoardAllInitial=sudokuBoardAll;

// [rowSolved,colSolved,boxSolved,sudokuBoardAllII] = sBATrySolver(sudokuBoardAll);
// sudokuBoardAll=sudokuBoardAllII;

// boardSolved = testIsSolution(rowSolved,colSolved,boxSolved,sudokuBoardAll);

// [storeBoards,storeBoardsSolvedMaybe,storeBoardsSolvedVars]=hailMaryUnsolvedBoards(boardSolved,sudokuBoardAll);

function setdiff(a,b)
{
    var c=[];

    for (var i=0;i<a.length;i++)
    {
        if (!b.includes(a[i]))
        {
            c.push(a[i]);
        }
    }

    return c;
}

function intersect(a,b)
{
    var c=[];

    for (var i=0;i<b.length;i++)
    {
        if (a.includes(b[i]))
        {
            c.push(b[i]);
        }
    }

    return c;
}

function getCol(a,colToGet)
{
    var colGot=[];
    for (var i=0;i<a.length;i++)
    {
        colGot.push(a[i][colToGet]);
    }

    return colGot;
}


  function sumArray(array)
  {
    var summed=0;
    for (var i=0;i<array.length;i++)
    {
      summed=summed+array[i];
    }
    return summed;
  }

  function compareNumbers(a,b)
  {
    //Learned from user:Paul Dixon @ https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
    return a-b;
  }