package com.project.daycare.controller;

import com.project.daycare.module.Children;
import com.project.daycare.repository.ChildrenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class ChildrenController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ChildrenRepository childrenRepository;

    @GetMapping(value = "/children")
    public List<Children> getChildren(){
        return childrenRepository.findAll();
    }

    @PostMapping(value = "/children")
    public List<Children> insertChild(@RequestBody final Children child){
        String SQL = "INSERT INTO children (name,age,address,phone_number,email) VALUE ( '" +child.getName()+"',"+child.getAge()+",'"+child.getAddress()+"','"+child.getPhoneNumber()+"','"+child.getEmail()+"')";
        jdbcTemplate.execute(SQL);
        return childrenRepository.findAll();
    }

    @DeleteMapping(value="/children/{id}")
    public List<Children> deleteChild(@PathVariable(value="id") String id){
        String SQL = "DELETE FROM children WHERE id="+id;
        jdbcTemplate.execute(SQL);
        return childrenRepository.findAll();
    }

    @PutMapping(value="/children")
    public List<Children> updateChild(@RequestBody final Children child){
        String SQL = "UPDATE children SET name = '" +child.getName()+"',age = "+child.getAge()+",address='"+child.getAddress()+"',phone_number='"+child.getPhoneNumber()+"',email='"+child.getEmail()+"' WHERE id=" +child.getId();
//        System.out.println(SQL);
        jdbcTemplate.execute(SQL);
        return childrenRepository.findAll();
    }
}
