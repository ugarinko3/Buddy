package com.camp.Buddy.service;

import com.camp.Buddy.model.Goal;
import com.camp.Buddy.model.User;
import com.camp.Buddy.repository.GoalsRepository;
import com.camp.Buddy.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class GoalService {
    private final GoalsRepository goalsRepository;
    private final UserRepository userRepository;

    public void deleteGoal(Goal goal) {
        goalsRepository.deleteById(goal.getId());
    }

    public ResponseEntity<Goal> setStatusGoal(Goal goal) throws Exception {
        Goal goalChange = goalsRepository.findById(goal.getId()).orElseThrow(() -> new Exception("not found goal"));
        goalChange.setStatus(true);
        return ResponseEntity.ok(createGoal(goalChange));
    }

    public ResponseEntity<Goal> creteGoalUser(Goal goal) {
        return ResponseEntity.ok(createGoal(goal));
    }

    public Goal createGoal(Goal goal) {
        return goalsRepository.save(goal);
    }

}
