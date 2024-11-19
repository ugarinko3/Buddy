//package com.camp.Buddy.config.converter;
//
//import com.camp.Buddy.model.PostNews;
//import com.camp.Buddy.model.User;
//import com.camp.Buddy.model.dto.PostDTO;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.Converter;
//import org.modelmapper.ModelMapper;
//import org.modelmapper.TypeMap;
//import org.springframework.stereotype.Component;
//
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Component
//@RequiredArgsConstructor
//public class UserToStringConverter {
//
//    private final ModelMapper modelMapper;
//
//    @PostConstruct
//    public void AddCustomMapping() {
//        Converter<Set<User>, Set<String>> converter = mappingContext ->
//            mappingContext.getSource().stream()
//                    .map(User::getLogin)
//                    .collect(Collectors.toSet());
//
//        TypeMap<PostNews, PostDTO> typeMap = modelMapper.createTypeMap(PostNews.class, PostDTO.class);
//        typeMap.addMappings(mapper -> {
//            mapper.using(converter).map(PostNews::getLikedByUsers, PostDTO::setLikedByUsers);
//        });
//    }
//
//}
