# Metadata

- **ID**: 511
- **Title**: PyTorch Fundamentals
- **Difficulty**: Medium
- **Category**: Data Science and Machine Learning
- **Subcategory**: Deep Learning
- **Similar Questions**: Coursera: "Introduction to Deep Learning with PyTorch", Udacity: "PyTorch Scholarship Challenge"
- **Real Life Domains**: Computer Vision, Natural Language Processing

# Problem Description

Imagine you have a bunch of pictures, and you want your computer to be able to look at those pictures and figure out what's in them. For example, maybe you have some pictures of different animals, and you want your computer to be able to say "that's a dog" or "that's a cat" when it looks at the pictures.
To do this, we're going to use something called PyTorch, which is a special kind of computer program that can help us teach the computer to recognize the things in the pictures. PyTorch is like a tool that lets us build these super smart computer programs that can see and understand the world just like we can.
The problem we're trying to solve is: how can we use PyTorch to build a computer program that can look at pictures and know what's in them? This is called "computer vision", and it's a really cool and important part of artificial intelligence (AI) and machine learning.
To solve this problem, we'll need to do things like:

Gather a bunch of pictures and label them (so the computer knows what's in each one)
Use PyTorch to build a neural network (which is like a special kind of computer program that can learn from data)
Train the neural network to recognize the things in the pictures
Test the neural network to make sure it's working well

It might sound a bit complicated, but don't worry! With PyTorch and some practice, you can learn how to build these amazing computer vision programs that can see the world just like you can. It's going to be a fun and exciting journey!

# Versions

## Version 1: Basic Tensor Operations

Imagine you're working on a computer vision project where you need to manipulate image data represented as PyTorch tensors. Your task is to:

### Create a Tensor Representing an Image:

- Create tensors using different methods: `torch.tensor()`, `torch.from_numpy()`, and `torch.zeros()`
- Understand tensor properties like `dtype`, `device`, and `requires_grad`
- Master tensor shape manipulation using `view()`, `reshape()`, and `permute()`
- Work with 3D tensors (height×width×channels) and 4D batched tensors (batch×channels×height×width)

### Perform Basic Operations:

1. Resizing Operations:

   - Use `torch.nn.functional.interpolate()` for resizing
   - Understand different interpolation modes (nearest, bilinear, bicubic)
   - Handle batch dimensions during resizing

2. Normalization Techniques:

   - Implement min-max normalization using `torch.min()` and `torch.max()`
   - Calculate mean and standard deviation with `torch.mean()` and `torch.std()`
   - Apply channel-wise normalization using PyTorch's broadcasting rules

3. Data Augmentation:
   - Use `torch.rot90()` for rotation
   - Implement random cropping with `torch.narrow()`
   - Create custom tensor operations for flipping and scaling

### Leverage GPU Acceleration:

- Move tensors between devices using `.to('cuda')` and `.to('cpu')`
- Understand memory management with `torch.cuda.empty_cache()`
- Profile tensor operations using `torch.cuda.Event()` for timing
- Implement efficient batch processing on GPU

## Version 2: Building Neural Networks

In this version, you'll be required to construct a neural network using PyTorch's fundamental building blocks:

### Designing the Network Architecture:

- Create custom layers by extending `nn.Module`
- Implement forward pass using PyTorch's automatic differentiation
- Understanding parameter initialization using `nn.init`
- Layer composition:
  ```python
  class CustomNet(nn.Module):
      def __init__(self):
          super().__init__()
          self.conv1 = nn.Conv2d(3, 64, kernel_size=3)
          self.pool = nn.MaxPool2d(2, 2)
          self.fc = nn.Linear(64 * 14 * 14, 10)
  ```

### Implementing Forward and Backward Propagation:

- Design efficient forward methods using PyTorch operations
- Understand autograd mechanics and gradient flow
- Handle different input sizes and batch dimensions
- Implement custom backward hooks for gradient analysis

### Managing Optimizer Settings and Loss Functions:

- Configure optimizers with appropriate parameters:
  ```python
  optimizer = torch.optim.SGD(model.parameters(),
                             lr=0.01,
                             momentum=0.9,
                             weight_decay=1e-4)
  ```
- Implement common loss functions:
  - CrossEntropyLoss for classification
  - MSELoss for regression
  - Custom loss functions using PyTorch operations

## Version 3: Advanced Training Techniques

In this version, you'll enhance your PyTorch model's core functionality:

### Implementing Regularization Techniques:

- Add dropout layers with correct training/eval modes
- Implement batch normalization with proper momentum
- Create custom learning rate schedulers using `torch.optim.lr_scheduler`
- Handle gradient clipping using `torch.nn.utils.clip_grad_norm_`

### Experimenting with Different Optimizers:

- Compare optimization algorithms:

  ```python
  # SGD with momentum
  optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

  # Adam with weight decay
  optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)
  ```

- Implement gradient accumulation for large models
- Monitor gradient norms and update ratios

### Utilizing Transfer Learning:

- Load pre-trained models using `torch.load()`
- Handle state dict manipulation for partial loading
- Implement feature extraction using `requires_grad=False`
- Fine-tune specific layers while freezing others

## Version 4: Real-Life Scenarios

In this version, you'll apply core PyTorch concepts to practical problems:

### Scenario 1: Image Classification for Medical Imaging:

- Implement custom Dataset and DataLoader classes
- Handle medical image formats using PyTorch transforms
- Create efficient data pipelines with proper batching
- Implement custom loss functions for imbalanced data

### Scenario 2: Natural Language Processing for Chatbot Development:

- Work with text tensors and embeddings
- Implement sequence padding and packing
- Create attention mechanisms using PyTorch operations
- Handle variable-length sequences efficiently

### Scenario 3: Time Series Forecasting for Financial Applications:

- Structure time series data as PyTorch tensors
- Implement sliding window operations using tensors
- Create custom loss functions for financial metrics
- Handle sequential data batching efficiently

# Constraints

- All code must use PyTorch 2.0+ syntax and best practices
- Memory requirements:
  - GPU memory should not exceed 8GB for basic operations
  - Implement gradient checkpointing for larger models
  - Use mixed precision training where applicable
- Performance targets:
  - Batch processing should utilize at least 70% GPU capacity
  - Model loading time should not exceed 5 seconds
  - Data loading should not be a bottleneck (use proper prefetching)
- Code quality:
  - Must include type hints for all function definitions
  - Must follow PEP 8 style guidelines
  - All custom modules must include docstrings
- Error handling:
  - Must include proper device checks before GPU operations
  - Should handle common tensor dimension mismatches
  - Must validate input shapes and types

# Notes

## General Guidelines

- Always check tensor device location before operations
- Use `torch.nn.Parameter` for learnable parameters
- Prefer `torch.nn` modules over manual parameter management
- Use `@torch.no_grad()` for inference and validation
- Remember to call `model.train()` and `model.eval()` appropriately

## Common Pitfalls

- Forgetting to zero gradients with `optimizer.zero_grad()`
- Mixing data types (float32/float64) unintentionally
- Not handling non-contiguous tensors properly
- Memory leaks from not clearing GPU cache
- Incorrect broadcasting assumptions

## Performance Tips

- Use `torch.jit.script` for performance-critical parts
- Implement proper data prefetching with `num_workers`
- Use `pin_memory=True` for faster GPU transfer
- Profile memory usage with `torch.cuda.max_memory_allocated()`
- Monitor GPU utilization during training

## Debugging Tools

- `torch.autograd.detect_anomaly()` for NaN debugging
- `torch.autograd.profiler` for performance analysis
- `torch.cuda.memory_summary()` for memory profiling
- PyTorch's built-in debugger hooks
- TensorBoard integration for visualization

## Best Practices

1. Data Management:

   - Use proper data loading pipelines
   - Implement efficient data augmentation
   - Handle imbalanced datasets appropriately

2. Model Development:

   - Start with simple architectures
   - Validate layer dimensions manually
   - Test forward pass with sample data
   - Verify gradient flow

3. Training Loop:

   - Implement proper validation steps
   - Save checkpoints regularly
   - Monitor training metrics
   - Use early stopping when appropriate

4. Production Deployment:
   - Export models using TorchScript
   - Optimize model size when possible
   - Implement proper error handling
   - Include model versioning

---
