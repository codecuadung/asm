import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const MemoFlatlist = React.memo(FlatList);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.0.102:3000/');
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const filterDataByCategory = (category) => {
    if (category === 'Tất cả') {
      return data;
    } else {
      return data.filter(item => item.maLoaiSP == category)//mã loại = tên danh mục
    }
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity 
      key={category} //khoi tao key
      onPress={() => setSelectedCategory(category)}//truyền danh mục vào
      style={{
        backgroundColor: selectedCategory === category ? '#FFC0CB' : 'transparent', // kiểm tra xem danh mục có dc chọn không
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
      }}
    >
      <Text style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}>
        {category}
      </Text>
    </TouchableOpacity>
  );
  
  

  return (
    <View style={{ flex: 1 ,margin:15}}>
      {/* header */}
      <View style={{height:70,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TouchableOpacity >
          <Image style={{width:30,height:30}} source={require('../images/user.png')}/>
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:16,fontWeight:'bold'}}>Hoa len</Text>
          <Text style={{fontSize:22,fontWeight:'bold',color:'#F26398'}}>Handmade</Text>
        </View>
        <TouchableOpacity >
          <Image style={{width:30,height:30}} source={require('../images/search.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{height:150,alignItems:'center',justifyContent:'center'}}>
        <Image style={{width:'90%',resizeMode:'cover',flex:1,borderRadius:20}} source={{uri:'https://hoalenhandmade.com/wp-content/uploads/2023/11/dan-moc-len-handmade-1024x448.jpg'}}/>
      </View>
      
      <View style={{width:'100%',marginTop:10}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderCategoryItem('Tất cả')}
        {renderCategoryItem('Hoa len lẻ')}
        {renderCategoryItem('Hoa len bó')}
        {renderCategoryItem('Phụ kiện len')}
        {renderCategoryItem('Len trang trí')}
        </ScrollView>
      </View>

      {/* FlatList */}
      <MemoFlatlist
        data={filterDataByCategory(selectedCategory)}
        keyExtractor={(item) => item._id}
        horizontal
        renderItem={({ item }) => (
          <View style={{ width: 150, height: 400, marginHorizontal: 5 }}>
            <Image style={{ resizeMode: 'cover', width: '100%', height: 155 }} source={{ uri: item.hinhAnh }} />
            <View style={{height:70}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold',color:'#F26398' }}>{item.tenSP}</Text>
            </View>
            <Text style={{ fontSize: 18 }}>Mô tả: {item.ghiChu}</Text>
            <Text style={{ fontSize: 18 }}>Giá: {item.giaSP}</Text>
            
          </View>
        )}
      />
      </View>
    </View>
  );
};

export default Home;
